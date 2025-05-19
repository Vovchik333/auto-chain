import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EtherscanNormalTransactionDto } from '../common/dto/etherscan-normal-transaction.dto';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';
import { EtherscanResponseDto } from '../common/dto/etherscan-response.dto';
import { mapTransactionFromList } from '../common/helpers/map-transaction.helper';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import mongoose, { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';
import { mapWalletFromDb } from '../common/helpers/map-wallet.helper';
import { WalletFilterDto } from './dto/wallet-filter.dto';
import { WalletDto } from '../common/dto/wallet.dto';
import { getAnalyticsFromTxs, toBigint } from '../common/helpers/wallet.helper';
import { Statistics, StatisticsDocument } from 'src/schemas/statistics.schema';
import { TransferInstruction } from './dto/transfer-instruction.dto';
import { UserIdAndWalletAddressDto } from '../common/dto/user-id-and-wallet-address.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreateWalletFromBlockchainDto } from './dto/create-wallet-from-blockchain.dto';
import { ethers } from 'ethers';

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

  async create(payload: CreateWalletDto) {
    const statistics = await this.statisticsModel.create({});
    const wallet = await this.walletModel.create({...payload, statistics});

    return mapWalletFromDb(wallet);
  }

  private async setStatistics(txs: Transaction[], payload: UserIdAndWalletAddressDto) {
    const { address } = payload; 
    const { analytics: walletAnalytics } = getAnalyticsFromTxs(txs, address);
    const statistics = await this.statisticsModel.create(walletAnalytics);

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
    payload: CreateWalletFromBlockchainDto
  ): Promise<WalletDto[]> {

    const { address, userId, name } = payload; 
    const response = await fetch(
      `${this.etherscanApiUrl}?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10000&sort=desc&apikey=${this.etherscanApiKey}`,
    );

    const data = await response.json() as EtherscanResponseDto;

    if (data.status === '0' && !Array.isArray(data.result)) {
      throw new HttpException(data.result, HttpStatusCode.BAD_REQUEST);
    }
    
    const walletId = new mongoose.Types.ObjectId();
    const txsList = data.result as EtherscanNormalTransactionDto[];
    const savedTxs = await this.transactionModel
      .insertMany(txsList.map(tx => mapTransactionFromList(tx, {...payload, walletId: walletId.toString()})));
    const statistics = await this.setStatistics(savedTxs, payload);
    await this.walletModel
      .create({
        _id: walletId,
        name,
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

  async getSuggestionsForDiversification(walletIds: string[]) {
    const objectIds = walletIds.map(id => new Types.ObjectId(id));

    const wallets = await this.walletModel
      .find({ _id: { $in: objectIds } })
      .populate("statistics")
      .exec();

    const walletsWithBalances = wallets.map(wallet => {
      return {
        address: wallet.address,
        balance: ethers.parseUnits(wallet.statistics.balance.toString(), "ether")
      };
    });

    const total = walletsWithBalances.reduce((sum, wallet) => sum + wallet.balance, 0n);
    const target = total / BigInt(wallets.length);

    const deltas = walletsWithBalances.map(wallet => {
      return {
        address: wallet.address,
        balance: wallet.balance - target
      };
    });

    const transfers: TransferInstruction[] = [];

    for (let i = 0; i < deltas.length; i++) {
      if (deltas[i].balance <= 0n) continue;

      for (let j = 0; j < deltas.length; j++) {
        if (deltas[i].balance === 0n) break;

        if (deltas[j].balance < 0n) {
          const amount = deltas[i].balance < -deltas[j].balance ? deltas[i].balance : -deltas[j].balance;

          transfers.push({
            from: deltas[i].address,
            to: deltas[j].address,
            amount: ethers.formatUnits(amount, "ether")
          });

          deltas[i].balance -= amount;
          deltas[j].balance += amount;
        }
      }
    }

    return {
      total: ethers.formatUnits(total, "ether"),
      target: ethers.formatUnits(target, "ether"),
      transfers
    };
  }

  async getUserStats(userId: string) {
    const wallets = await this.findByFilter({ userId });

    if (wallets.length === 0) {
      return {
        id: new Types.ObjectId().toString(),
        balance: '0',
        totalReceived: '0',
        totalSent: '0',
        totalFeeUsed: '0',
        totalTxCount: 0
      };
    }
  
    const stats = wallets.reduce(
      (acc, cur) => {
        const curStats = cur.statistics;
  
        return {
          balance: acc.balance + toBigint(curStats.balance.toString()),
          totalReceived: acc.totalReceived + toBigint(curStats.totalReceived.toString()),
          totalSent: acc.totalSent + toBigint(curStats.totalSent.toString()),
          totalFeeUsed: acc.totalFeeUsed + toBigint(curStats.totalFeeUsed.toString()),
          totalTxCount: acc.totalTxCount + curStats.totalTxCount,
          largestAmountTransaction:
            toBigint(curStats.largestAmountTransaction?.value ?? '0') > toBigint(acc.largestAmountTransaction?.value ?? '0')
              ? curStats.largestAmountTransaction
              : acc.largestAmountTransaction
        };
      },
      {
        balance: 0n,
        totalReceived: 0n,
        totalSent: 0n,
        totalFeeUsed: 0n,
        totalTxCount: 0,
        largestAmountTransaction: wallets[0].statistics.largestAmountTransaction
      }
    );
  
    return {
      id: new Types.ObjectId().toString(),
      balance: ethers.formatEther(stats.balance),
      totalReceived: ethers.formatEther(stats.totalReceived),
      totalSent: ethers.formatEther(stats.totalSent),
      totalFeeUsed: ethers.formatEther(stats.totalFeeUsed),
      totalTxCount: stats.totalTxCount,
      largestAmountTransaction: stats.largestAmountTransaction
    };
  }
}
