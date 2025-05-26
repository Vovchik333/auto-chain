import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { TransactionFilterDto } from '../transactions/dto/transaction-filter.dto';
import { mapTransactionFromDb } from '../common/helpers/map-transaction.helper';
import { ethers, Wallet } from 'ethers';
import { WalletDocument } from 'src/schemas/wallet.schema';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>,
  ) {}

  async getByFilter(filter: TransactionFilterDto) {
    const { userId, ...rest } = filter;
    let transactions = [];

    if (userId) {
      const wallets = await this.walletModel.find({ userId }).exec();
      const walletsIds = wallets.map(wallet => wallet._id);
      console.log('Wallets IDs:', walletsIds);
      transactions = await this.transactionModel
        .find({...rest, walletId: { $in: walletsIds }})
        .exec();
    } else {
      transactions = await this.transactionModel
        .find(filter)
        .exec();
    }

    const mappedTransactions = transactions.map(mapTransactionFromDb);
    const successfulTransactions = mappedTransactions.filter(tx => tx.status === 'Success');

    let totalSent = ethers.getBigInt(0);
    let totalReceived = ethers.getBigInt(0);
    let totalFeeUsed = ethers.getBigInt(0);
    let largestAmount = ethers.getBigInt(0);
    let largestAmountTransaction = null;
    let balance = ethers.getBigInt(0);

    for (const tx of successfulTransactions) {
      const value = ethers.parseUnits(tx.value.toString(), 'ether');
      const fee = ethers.parseUnits(tx.txnFee.toString(), 'ether');
      
      if (tx.type === 'deposit') {
        totalReceived += value;
        balance += value;
      } else if (tx.type === 'withdraw') {
        totalSent += value;
        balance -= (value + fee);
        totalFeeUsed += fee;
      }

      if (value > largestAmount) {
        largestAmount = value;
        largestAmountTransaction = tx;
      }
    }

    return {
      totalTxCount: transactions.length,
      totalSent: ethers.formatUnits(totalSent, 'ether'),
      totalReceived: ethers.formatUnits(totalReceived, 'ether'),
      totalFeeUsed: ethers.formatUnits(totalFeeUsed, 'ether'),
      balance: ethers.formatUnits(balance, 'ether'),
      largestAmountTransaction
    };
  }
}
