import { Body, Controller, Post } from '@nestjs/common';
import { FraudReportService } from './fraud-report.service';
import { FraudReportDto } from './dto/fraud-report.dto';
import { CreateFraudReportDto } from './dto/create-fraud-report.dto';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { AuthCodeDto } from './dto/auth-code.dto';
import { UserWalletAddressDto } from '../common/dto/user-wallet-address.dto';

@Controller(ApiPath.FRAUD_REPORTS)
export class FraudReportController {
  constructor(private readonly fraudReportService: FraudReportService) {}

  @Post(ApiPath.AUTH_CODE)
  async generateAuthCode(
    @Body() payload: UserWalletAddressDto
  ): Promise<AuthCodeDto> {
    const authCode = await this.fraudReportService.generateAuthCode(payload.address);

    return {
      authCode
    };
  }

  @Post()
  async createFraudReport(
    @Body() payload: CreateFraudReportDto
  ): Promise<FraudReportDto> {
    const report = await this.fraudReportService.createFraudReport(payload);

    return report;
  }
}
