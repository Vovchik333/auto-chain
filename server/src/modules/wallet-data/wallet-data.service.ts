import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from 'ethers';
import { Model } from 'mongoose';
import { TransactionDocument } from 'src/schemas/transaction.schema';
import { WalletAnalytics, WalletAnalyticsDocument } from 'src/schemas/wallet-analytics.schema';
import { mapTransaction, mapTransactionFromDb } from '../common/helpers/map-transaction.helper';
import { parse } from 'csv-parse/sync';
import { EtherscanNormalTransactionDto } from '../common/dto/etherscan-normal-transaction.dto';
import { jsonToCsv } from 'src/utils/csv/json-to-csv.util';
import { EtherscanResponseDto } from '../common/dto/etherscan-response.dto';
import { TransactionDto } from '../common/dto/transaction.dto';

@Injectable()
export class WalletDataService {
  private etherscanApiUrl: string;
  private etherscanApiKey: string;
  
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(WalletAnalytics.name) private readonly walletModel: Model<WalletAnalyticsDocument>,
    private readonly configService: ConfigService
  ) {
    this.etherscanApiUrl = this.configService.get<string>('ETHERSCAN_API_URL');
    this.etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
  }

  async importTransactionsFromEtherscan(address: string): Promise<TransactionDto[]> {
    const response = await fetch(
      `${this.etherscanApiUrl}?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${this.etherscanApiKey}`,
    );

    const data = await response.json() as EtherscanResponseDto;

    if (data.status === '0' && !Array.isArray(data.result)) {
      throw new BadRequestException(data.result);
    }
    
    const txsList = data.result as EtherscanNormalTransactionDto[];
    const savedTxs = await this.transactionModel.insertMany(txsList.map(tx => mapTransaction(tx, address)));
    const analytics = {
      totalReceived: 0,
      totalSent: 0,
      totalFeeUsed: 0,
    } as unknown as WalletAnalytics;

    const mappedTxsFromDb = savedTxs.map(tx => {
      const mappedTx = mapTransactionFromDb(tx);

      analytics.totalFeeUsed += mappedTx.txnFee;
      if (mappedTx.to === address) {
        analytics.totalSent += mappedTx.value;
      } else {
        analytics.totalReceived += mappedTx.value;
      }

      return mappedTx;
    });
    analytics.totalTxCount = mappedTxsFromDb.length;
    analytics.largestAmountTransaction = (await this.transactionModel.find({ownerAddress: address}).sort({value: -1}).limit(1).exec())[0]?.hash;
    analytics.totalFeeUsed = (await this.transactionModel.find({ownerAddress: address}).sort({timeStamp: 1}).limit(1).exec())[0]?.txnFee;

    await this.walletModel.findOneAndUpdate(
      {ownerAddress: address},
      {$set: analytics},
      {upsert: true}
    );

    return mappedTxsFromDb;
  }

  async importTransactionsFromCsv(files: Record<string, Storage.MultipartFile[]>, address: string): Promise<TransactionDto[]> {
    const data = files['csv'][0].buffer.toString('utf-8');
    const txsList = parse(data, {
      columns: true,
      skip_empty_lines: true,
    }) as EtherscanNormalTransactionDto[];

    const savedTxs = await this.transactionModel.insertMany(txsList.map(tx => mapTransaction(tx, address)));

    return savedTxs.map(mapTransactionFromDb);
  }

  async exportTransactionsToCsv(address: string): Promise<string> {
    const txsList = await this.transactionModel
      .find({ownerAddress: address})
      .exec();

    const csv = jsonToCsv(txsList.map(mapTransactionFromDb));
  
    return csv;
  }
}
