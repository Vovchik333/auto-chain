import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FraudReportDto } from './dto/fraud-report.dto';
import { CreateFraudReportDto } from './dto/create-fraud-report.dto';
import { ethers } from 'ethers';
import { randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { FraudReport, FraudReportDocument } from 'src/schemas/fraud-report.schema';
import { Model } from 'mongoose';

@Injectable()
export class FraudReportService {
  private authCodes: Map<string, string> = new Map<string, string>();

  constructor(
    @InjectModel(FraudReport.name) private readonly fraudReportModel: Model<FraudReportDocument>
  ) {}

  async generateAuthCode(address: string): Promise<string> {
    const authCode = randomUUID().toString();

    this.authCodes.set(address, authCode);

    setTimeout(() => {
      this.authCodes.delete(address);
    }, 1000 * 60 * 5);

    return authCode;
  }

  async createFraudReport(payload: CreateFraudReportDto): Promise<FraudReportDto> {
    const { signature, ...report} = payload;
    const storedCode = this.authCodes.get(report.fromAddress);
    if (storedCode === undefined) {
      throw new UnauthorizedException('Auth code is not valid');
    }

    const verifiedMessage = ethers.verifyMessage(storedCode, signature);
    if (verifiedMessage.toLowerCase() !== report.fromAddress.toLowerCase()) {
      throw new UnauthorizedException('Bad signature');
    }

    this.authCodes.delete(report.fromAddress);

    const fraudReport = await this.fraudReportModel.create(report);

    return {
      id: fraudReport._id,
      fromAddress: fraudReport.fromAddress,
      toAddress: fraudReport.toAddress,
      transactionHash: fraudReport.transactionHash,
      amount: fraudReport.amount,
      description: fraudReport.description
    };
  }
}
