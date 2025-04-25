import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FraudReportDto } from './dto/fraud-report.dto';
import { CreateFraudReportDto } from './dto/create-fraud-report.dto';
import { ethers } from 'ethers';
import { randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { FraudReport, FraudReportDocument } from 'src/schemas/fraud-report.schema';
import { Model } from 'mongoose';
import { ValueOf } from 'src/common/types/value-of.type';
import { FraudCategory } from 'src/common/enums/report/fraud-category.enum';

@Injectable()
export class FraudReportService {
  private authCodes: Map<string, string> = new Map<string, string>();

  constructor(
    @InjectModel(FraudReport.name) private readonly fraudReportModel: Model<FraudReportDocument>
  ) {}

  async generateAuthCode(address: string): Promise<string> {
    const authCode = randomUUID().toString();

    // ------------------test---------------------------------
    const wallet = ethers.Wallet.createRandom();
    const signature = await wallet.signMessage(authCode);
    console.log('pub addr: ', wallet.address);
    console.log('signature: ', signature);
    this.authCodes.set(wallet.address, authCode);
    // -------------------------------------------------------

    // this.authCodes.set(address, authCode);

    setTimeout(() => {
      this.authCodes.delete(address);
    }, 1000 * 60 * 5);

    return authCode;
  }

  async createFraudReport(payload: CreateFraudReportDto): Promise<FraudReportDto> {
    const { signature, ...report} = payload;
    const storedCode = this.authCodes.get(report.reporterAddress);
    if (storedCode === undefined) {
      throw new UnauthorizedException('Auth code is not valid');
    }

    const verifiedMessage = ethers.verifyMessage(storedCode, signature);
    if (verifiedMessage.toLowerCase() !== report.reporterAddress.toLowerCase()) {
      throw new UnauthorizedException('Bad signature');
    }

    this.authCodes.delete(report.reporterAddress);

    const fraudReport = await this.fraudReportModel.create(report);

    return {
      id: fraudReport._id,
      reporterAddress: fraudReport.reporterAddress,
      walletAddress: fraudReport.walletAddress,
      category: fraudReport.category as ValueOf<typeof FraudCategory>,
      totalLossEstimatedUsd: fraudReport.totalLossEstimatedUsd,
      evidenceLinks: fraudReport.evidenceLinks,
      reason: fraudReport.reason,
      confirmed: fraudReport.confirmed
    };
  }
}
