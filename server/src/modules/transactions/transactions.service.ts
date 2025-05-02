import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactiontDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async create(payload: CreateTransactionDto) {
    const tx = await this.transactionModel.create(payload);

    return tx;
  }

  async getById(id: string) {
    const tx = await this.transactionModel
      .findById(id)
      .exec();

    if (!tx) {
      throw new NotFoundException('Transaction not found');
    }

    return tx;
  }

  async updateById(id: string, payload: UpdateTransactiontDto) {
    const tx = await this.transactionModel.findByIdAndUpdate(
      id,
      payload,
      { new: true },
    );

    if (!tx) {
      throw new NotFoundException('Transaction not found');
    }

    return tx;
  }
}
