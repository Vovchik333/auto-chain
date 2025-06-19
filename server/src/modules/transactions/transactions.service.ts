import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactiontDto } from './dto/update-transaction.dto';
import { jsonToCsv } from 'src/utils/csv/json-to-csv.util';
import { TransactionDto } from '../common/dto/transaction.dto';
import { parse } from 'csv-parse/sync';
import { mapTransactionFromDb } from '../common/helpers/map-transaction.helper';
import { TransactionFilterDto } from './dto/transaction-filter.dto';
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';

@Injectable()
export class TransactionsService {
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
      transactions = await this.transactionModel
        .find({...rest, walletId: { $in: walletsIds }})
        .exec();
    } else {
      transactions = await this.transactionModel
        .find(filter)
        .exec();
    }

    return transactions.map(mapTransactionFromDb);
  }

  async create(payload: CreateTransactionDto) {
    const tx = await this.transactionModel.create(payload);

    return mapTransactionFromDb(tx);
  }

  async getById(id: string) {
    const tx = await this.transactionModel
      .findById(id)
      .exec();

    if (!tx) {
      throw new NotFoundException('Transaction not found');
    }

    return mapTransactionFromDb(tx);
  }

  async updateById(
    id: string, 
    payload: UpdateTransactiontDto
  ) {
    const tx = await this.transactionModel.findByIdAndUpdate(
      id,
      payload,
      { new: true },
    );

    if (!tx) {
      throw new NotFoundException('Transaction not found');
    }

    return mapTransactionFromDb(tx);
  }

  async deleteById(id: string) {
    const tx = await this.transactionModel.findByIdAndDelete(id);

    if (!tx) {
      throw new NotFoundException('Transaction not found');
    }

    return mapTransactionFromDb(tx);
  }

  async importFromCsv(
    files: Record<string, Storage.MultipartFile[]>,
    payload: Pick<TransactionDto, 'walletId'>
  ): Promise<TransactionDto[]> {
    const data = files['files'][0].buffer.toString('utf-8');
    const txsList = parse(data, {
      columns: true,
      skip_empty_lines: true,
    }) as TransactionDto[];

    const requiredFields = ['hash', 'from', 'to', 'value', 'date', 'txnFee', 'category', 'type'];
    const keys = Object.keys(txsList[0] || {});
    for (const field of requiredFields) {
      if (!keys.includes(field)) {
        throw new BadRequestException(`Missing required field: ${field}`);
      }
    }

    const savedTxs = await this
      .transactionModel
      .insertMany(txsList.map(tx => ({ ...tx, ...payload })));

    return savedTxs.map(mapTransactionFromDb);
  }

  async exportToCsv(payload: TransactionFilterDto): Promise<string> {
    const { userId, ...rest } = payload;
    let transactions = [];

    if (userId) {
      const wallets = await this.walletModel.find({ userId }).exec();
      const walletsIds = wallets.map(wallet => wallet._id);
      transactions = await this.transactionModel
        .find({...rest, walletId: { $in: walletsIds }})
        .exec();
    } else {
      transactions = await this.transactionModel
        .find(payload)
        .exec();
    }

    const csv = jsonToCsv(transactions.map(mapTransactionFromDb));

    return csv;
  }
}
