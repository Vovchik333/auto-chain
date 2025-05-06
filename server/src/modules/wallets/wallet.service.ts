import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EtherscanNormalTransactionDto } from '../common/dto/etherscan-normal-transaction.dto';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';
import { EtherscanResponseDto } from '../common/dto/etherscan-response.dto';
import { ReportItemDto } from '../common/dto/report-item.dto';
import { checkReliabilityByFirstTx } from '../common/helpers/check-reliability-by-first-tx.helper';
import { mapTransaction, mapTransactionFromDb } from '../common/helpers/map-transaction.helper';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionDto } from '../common/dto/transaction.dto';
import { parse } from 'csv-parse/sync';
import { jsonToCsv } from 'src/utils/csv/json-to-csv.util';
import { WalletAnalytics } from 'src/schemas/wallet-analytics.schema';
import { getAnalyticsFromTxs } from './wallet.helper';

@Injectable()
export class WalletService {
  private etherscanApiUrl: string;
  private etherscanApiKey: string;
  
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(WalletAnalytics.name) private readonly walletModel: Model<WalletAnalytics>,
    private readonly configService: ConfigService
  ) {
    this.etherscanApiUrl = this.configService.get<string>('ETHERSCAN_API_URL');
    this.etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
  }

  private async getAnalytics(txs: Transaction[], address: string) {
    const { analytics, mappedTxsFromDb } = getAnalyticsFromTxs(txs, address);

    analytics.largestAmountTransaction = (await this.transactionModel.find({ownerAddress: address}).sort({value: -1}).limit(1).exec())[0]?.hash;
    analytics.totalFeeUsed = (await this.transactionModel.find({ownerAddress: address}).sort({timeStamp: 1}).limit(1).exec())[0]?.txnFee;

    await this.walletModel.findOneAndUpdate(
      { address },
      {
        $set: {
          largestAmountTransaction: analytics.largestAmountTransaction,
        },
        $inc: {
          totalReceived: analytics.totalReceived,
          totalSent: analytics.totalSent,
          totalTxCount: analytics.totalTxCount,
          totalFeeUsed: analytics.totalFeeUsed,
        },
      },
      {upsert: true}
    );

    return mappedTxsFromDb;
  }

  async importTransactionsFromEtherscan(address: string): Promise<TransactionDto[]> {
    const response = await fetch(
      `${this.etherscanApiUrl}?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${this.etherscanApiKey}`,
    );

    const data = await response.json() as EtherscanResponseDto;

    if (data.status === '0' && !Array.isArray(data.result)) {
      throw new HttpException(data.result, HttpStatusCode.BAD_REQUEST);
    }
    
    const txsList = data.result as EtherscanNormalTransactionDto[];
    const savedTxs = await this.transactionModel.insertMany(txsList.map(tx => mapTransaction(tx, address)));

    return await this.getAnalytics(savedTxs, address);
  }

  async importTransactionsFromCsv(files: Record<string, Storage.MultipartFile[]>, address: string): Promise<TransactionDto[]> {
    const data = files['csv'][0].buffer.toString('utf-8');
    const txsList = parse(data, {
      columns: true,
      skip_empty_lines: true,
    }) as EtherscanNormalTransactionDto[];

    const savedTxs = await this.transactionModel.insertMany(txsList.map(tx => mapTransaction(tx, address)));

    return await this.getAnalytics(savedTxs, address);
  }

  async exportTransactionsToCsv(address: string): Promise<string> {
    const txsList = await this.transactionModel
      .find({ownerAddress: address})
      .exec();

    const csv = jsonToCsv(txsList.map(mapTransactionFromDb));
  
    return csv;
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
