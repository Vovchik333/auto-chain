import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EtherscanNormalTransactionDto } from './dto/etherscan-normal-transaction.dto';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';
import { EtherscanResponseDto } from './dto/etherscan-response.dto';
import { ReportItemDto } from './dto/report-item.dto';
import { checkReliabilityByFirstTx } from './helpers/check-reliability-by-first-tx.helper';

@Injectable()
export class CheckUserAddressService {
  private etherscanApiUrl: string;
  private etherscanApiKey: string;
  
  constructor(private readonly configService: ConfigService) {
    this.etherscanApiUrl = this.configService.get<string>('ETHERSCAN_API_URL');
    this.etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
  }

  async checkUserAddress(address: string): Promise<ReportItemDto[]> {
    const response = await fetch(
      `${this.etherscanApiUrl}?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${this.etherscanApiKey}`,
    );

    const data = await response.json() as EtherscanResponseDto;

    if (data.status === '0' && !Array.isArray(data.result)) {
      throw new HttpException(data.result, HttpStatusCode.BAD_REQUEST);
    }

    const report: ReportItemDto[] = [];
    const txsList = data.result as EtherscanNormalTransactionDto[];

    checkReliabilityByFirstTx(report, txsList);

    return report;
  }
}
