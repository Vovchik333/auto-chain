import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { TransactionFilterDto } from '../transactions/dto/transaction-filter.dto';
import { mapTransactionFromDb } from '../common/helpers/map-transaction.helper';
import { ethers } from 'ethers';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async getByFilter(filter: TransactionFilterDto) {
    const transactions = await this.transactionModel
      .find(filter)
      .exec();
    const mappedTransactions = transactions.map(mapTransactionFromDb);
    const successfulTransactions = mappedTransactions.filter(tx => tx.status === 'Success');

    let totalSent = ethers.getBigInt(0);
    let totalReceived = ethers.getBigInt(0);
    let totalFeeUsed = ethers.getBigInt(0);
    let largestAmount = ethers.getBigInt(0);
    let largestAmountTransaction = null;

    for (const tx of successfulTransactions) {
      const value = ethers.parseUnits(tx.value.toString(), 'ether');
      const fee = ethers.parseUnits(tx.txnFee.toString(), 'ether');
      
      totalSent = totalSent + value;
      totalReceived = totalReceived + value;
      totalFeeUsed = totalFeeUsed + fee;

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
      largestAmountTransaction
    };
  }
}
