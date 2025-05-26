import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactiontDto } from './dto/update-transaction.dto';
import { jsonToCsv } from 'src/utils/csv/json-to-csv.util';
import { UserIdAndWalletIdDto } from '../common/dto/user-id-and-wallet-id.dto';
import { TransactionDto } from '../common/dto/transaction.dto';
import { parse } from 'csv-parse/sync';
import { mapTransactionFromDb } from '../common/helpers/map-transaction.helper';
import { TransactionFilterDto } from './dto/transaction-filter.dto';
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>, // Replace 'any' with the actual WalletDocument type if available
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

  async importTransactionsFromCsv(
    files: Record<string, Storage.MultipartFile[]>, 
    payload: UserIdAndWalletIdDto
  ): Promise<TransactionDto[]> {
    const data = files['files'][0].buffer.toString('utf-8');
    const txsList = parse(data, {
      columns: true,
      skip_empty_lines: true,
    }) as TransactionDto[];

    const savedTxs = await this
      .transactionModel
      .insertMany(txsList.map(tx => ({ ...tx, ...payload })));

    return savedTxs.map(mapTransactionFromDb);
  }

  async exportTransactionsToCsv(payload: UserIdAndWalletIdDto): Promise<string> {
    const { walletId, userId } = payload;
    const filter = walletId ? { userId, walletId } : { userId };

    const txsList = await this.transactionModel
      .find(filter)
      .exec();

    const csv = jsonToCsv(txsList.map(mapTransactionFromDb));

    return csv;
  }
}
