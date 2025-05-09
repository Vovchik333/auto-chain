import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EtherscanNormalTransactionDto } from '../common/dto/etherscan-normal-transaction.dto';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';
import { EtherscanResponseDto } from '../common/dto/etherscan-response.dto';
import { mapTransaction, mapTransactionFromDb } from '../common/helpers/map-transaction.helper';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionDto } from '../common/dto/transaction.dto';
import { Wallet } from 'src/schemas/wallet.schema';
import { mapWalletFromDb } from '../common/helpers/map-wallet.helper';
import { UserWalletAddressDto } from '../common/dto/user-wallet-address.dto';
import { WalletFilterDto } from './dto/wallet-filter.dto';
import { WalletDto } from '../common/dto/wallet.dto';

@Injectable()
export class WalletService {
  private etherscanApiUrl: string;
  private etherscanApiKey: string;
  
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
    private readonly configService: ConfigService
  ) {
    this.etherscanApiUrl = this.configService.get<string>('ETHERSCAN_API_URL');
    this.etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
  }

  // private async getAnalytics(txs: Transaction[], payload: UserWalletAddressDto) {
  //   const { address, userId } = payload; 
  //   const { analytics, mappedTxsFromDb } = getAnalyticsFromTxs(txs, address);

  //   analytics.largestAmountTransactionHash = (await this.transactionModel.find({walletAddress: address}).sort({value: -1}).limit(1).exec())[0]?.hash;
  //   analytics.totalFeeUsed = (await this.transactionModel.find({walletAddress: address}).sort({timeStamp: 1}).limit(1).exec())[0]?.txnFee;

  //   await this.walletModel.findOneAndUpdate(
  //     { address },
  //     {
  //       $set: {
  //         walletAddress: address,
  //         userId,
  //         largestAmountTransactionHash: analytics.largestAmountTransactionHash,
  //       },
  //       $inc: {
  //         totalReceived: analytics.totalReceived,
  //         totalSent: analytics.totalSent,
  //         totalTxCount: analytics.totalTxCount,
  //         totalFeeUsed: analytics.totalFeeUsed,
  //       },
  //       $push: {
  //         transactions: { $each: txs.map(tx => tx._id) }
  //       }
  //     },
  //     {upsert: true}
  //   );

  //   return mappedTxsFromDb;
  // }

  async findByFilter(query: WalletFilterDto) {
    const wallets = await this.walletModel
      .find({...query})
      .populate('transactions')
      .exec();

    return wallets.map(mapWalletFromDb);
  }

  async findTxsByHash(walletAddress: string): Promise<TransactionDto[]> {
    const txsList = await this.transactionModel
      .find({ walletAddress })
      .exec();
    
    return txsList.map(mapTransactionFromDb);
  }

  async importTransactionsFromEtherscan(
    payload: UserWalletAddressDto
  ): Promise<WalletDto[]> {
    const { address, userId } = payload; 
    const response = await fetch(
      `${this.etherscanApiUrl}?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${this.etherscanApiKey}`,
    );

    const data = await response.json() as EtherscanResponseDto;

    if (data.status === '0' && !Array.isArray(data.result)) {
      throw new HttpException(data.result, HttpStatusCode.BAD_REQUEST);
    }
    
    const txsList = data.result as EtherscanNormalTransactionDto[];
    const savedTxs = await this.transactionModel.insertMany(txsList.map(tx => mapTransaction(tx, payload)));
    await this.walletModel.create({
      address,
      userId,
      transactions: savedTxs.map(tx => tx._id),
      isSyncWithBlockchain: false,
      statisticsId: ''
    });
    const wallets = await this.walletModel.find({userId}).populate('transactions').exec();

    return wallets.map(mapWalletFromDb);
  }

  // async checkUserAddress(address: string): Promise<ReportItemDto[]> {
  //   const response = await fetch(
  //     `${this.etherscanApiUrl}?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=asc&apikey=${this.etherscanApiKey}`,
  //   );

  //   const data = await response.json() as EtherscanResponseDto;

  //   if (data.status === '0' && !Array.isArray(data.result)) {
  //     throw new HttpException(data.result, HttpStatusCode.BAD_REQUEST);
  //   }

  //   const report: ReportItemDto[] = [];
  //   const txsList = data.result as EtherscanNormalTransactionDto[];

  //   checkReliabilityByFirstTx(report, txsList);

  //   return report;
  // }
}
