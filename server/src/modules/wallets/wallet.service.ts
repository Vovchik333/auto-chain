import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EtherscanNormalTransactionDto } from '../common/dto/etherscan-normal-transaction.dto';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';
import { EtherscanResponseDto } from '../common/dto/etherscan-response.dto';
import { mapTransaction, mapTransactionFromDb } from '../common/helpers/map-transaction.helper';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';
import { mapWalletFromDb } from '../common/helpers/map-wallet.helper';
import { UserWalletAddressDto } from '../common/dto/user-wallet-address.dto';
import { WalletFilterDto } from './dto/wallet-filter.dto';
import { WalletDto } from '../common/dto/wallet.dto';
import { getAnalyticsFromTxs } from '../common/helpers/wallet.helper';
import { Statistics, StatisticsDocument } from 'src/schemas/statistics.schema';
import { TransferInstruction } from './dto/transfer-instruction.dto';

@Injectable()
export class WalletService {
  private etherscanApiUrl: string;
  private etherscanApiKey: string;
  
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>,
    @InjectModel(Statistics.name) private readonly statisticsModel: Model<StatisticsDocument>,
    private readonly configService: ConfigService
  ) {
    this.etherscanApiUrl = this.configService.get<string>('ETHERSCAN_API_URL');
    this.etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
  }

  private async setStatistics(txs: Transaction[], payload: UserWalletAddressDto) {
    const { address, userId } = payload; 
    const { analytics: walletAnalytics } = getAnalyticsFromTxs(txs, address);
    const statistics = await this.statisticsModel.create(walletAnalytics);
    // const allTxs = await this.transactionModel.find({userId}).exec();
    // const { analytics: userAnalytics } = getAnalyticsFromTxs(allTxs, address);
    
    // await this.statisticsModel.updateOne(
    //   {userId},
    //   {$set: {...userAnalytics}}
    // )

    return statistics;
  }

  async findByFilter(query: WalletFilterDto) {
    const wallets = await this.walletModel
      .find({...query})
      .populate([
        { path: 'transactions' },
        { path: 'statistics', populate: { path: 'largestAmountTransaction' } },
      ])
      .exec();

    return wallets.map(mapWalletFromDb);
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
    const statistics = await this.setStatistics(savedTxs, payload);
    await this.walletModel.create({
      address,
      userId,
      transactions: savedTxs.map(tx => tx._id),
      isSyncWithBlockchain: false,
      statistics: statistics._id,
    });

    const wallets = await this.walletModel
      .find({userId})
      .populate([
        {path: 'transactions'},
        {path: 'statistics', populate: { path: 'largestAmountTransaction' }},
      ])
      .exec();

    return wallets.map(mapWalletFromDb);
  }

  async getSuggestionsForDiversification(
    walletIds: string[],
  ) {
    const objectIds = walletIds.map(id => new Types.ObjectId(id));

    const wallets = await this.walletModel
      .find({
        _id: { $in: objectIds }
      })
      .populate('statistics')
      .exec();
    
    const walletsWithBalances = wallets.map(wallet => {
      return {
        address: wallet.address,
        balance: wallet.statistics.totalReceived - wallet.statistics.totalSent
      }
    })

    const total = walletsWithBalances.reduce((sum, wallet) => sum + wallet.balance, 0);
    const target = total / wallets.length;

    const deltas = walletsWithBalances.map(wallet => {
      return {
        address: wallet.address,
        balance: wallet.balance - target
      }
    });
    const transfers: TransferInstruction[] = [];

    for (let i = 0; i < deltas.length; i++) {
      if (deltas[i].balance <= 0) {
        continue;
      }

      for (let j = 0; j < deltas.length; j++) {
        if (deltas[i].balance === 0) {
          break;
        }

        if (deltas[j].balance < 0) {
          const amount = Math.min(deltas[i].balance, -deltas[j].balance);
          transfers.push({
            from: deltas[i].address,
            to: deltas[j].address,
            amount: amount,
          });
          deltas[i].balance -= amount;
          deltas[j].balance += amount;
        }
      }
    }

    return {
      total,
      target,
      transfers
    };
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
