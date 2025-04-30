import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EtherscanNormalTransactionDto } from './dto/etherscan-normal-transaction.dto';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';
import { EtherscanResponseDto } from './dto/etherscan-response.dto';
import { ReportItemDto } from './dto/report-item.dto';
import { checkReliabilityByFirstTx } from './helpers/check-reliability-by-first-tx.helper';
import { mapTransaction } from './helpers/map-transaction.helper';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WalletService {
  private etherscanApiUrl: string;
  private etherscanApiKey: string;
  
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    private readonly configService: ConfigService
  ) {
    this.etherscanApiUrl = this.configService.get<string>('ETHERSCAN_API_URL');
    this.etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
  }

  async importTransactionsFromEtherscan(address: string) {
    const response = await fetch(
      `${this.etherscanApiUrl}?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=desc&apikey=${this.etherscanApiKey}`,
    );

    const data = await response.json() as EtherscanResponseDto;

    if (data.status === '0' && !Array.isArray(data.result)) {
      throw new HttpException(data.result, HttpStatusCode.BAD_REQUEST);
    }
    
    const txsList = data.result as EtherscanNormalTransactionDto[];
    await this.transactionModel.insertMany(txsList.map(tx => mapTransaction(tx, address)));

    return txsList.map(tx => mapTransaction(tx, address));
  }

  async checkUserAddress(address: string): Promise<ReportItemDto[]> {
    const response = await fetch(
      `${this.etherscanApiUrl}?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${this.etherscanApiKey}`,
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
