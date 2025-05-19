import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactiontDto } from './dto/update-transaction.dto';
import { jsonToCsv } from 'src/utils/csv/json-to-csv.util';
import { UserIdAndWalletIdDto } from '../common/dto/user-id-and-wallet-id.dto';
import { TransactionDto } from '../common/dto/transaction.dto';
import { parse } from 'csv-parse/sync';
import { mapTransactionFromDb, mapTx } from '../common/helpers/map-transaction.helper';
import { TransactionFilterDto } from './dto/transaction-filter.dto';
import { Statistics, StatisticsDocument } from 'src/schemas/statistics.schema';
import { ConfigService } from '@nestjs/config';
import { HttpStatusCode } from 'src/common/enums/http/http-status-code.enum';
import { EtherscanResponseDto } from '../common/dto/etherscan-response.dto';

@Injectable()
export class TransactionsService {
  private etherscanApiUrl: string;
  private etherscanApiKey: string;

  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel(Statistics.name) private readonly statisticsModel: Model<StatisticsDocument>,
    private readonly configService: ConfigService
  ) {
    this.etherscanApiUrl = this.configService.get<string>('ETHERSCAN_API_URL');
    this.etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
  }

  async getByFilter(filter: TransactionFilterDto) {
    const txs = await this.transactionModel
      .find({ ...filter })
      .exec();

    return txs.map(mapTransactionFromDb);
  }

  async create(payload: CreateTransactionDto) {
    const { hash, ...rest } = payload; 
    const response = await fetch(
      `${this.etherscanApiUrl}?chainid=1&module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${this.etherscanApiKey}`,
    );

    const data = await response.json() as EtherscanResponseDto;

    if (data.status === '0' && !Array.isArray(data.result)) {
      throw new HttpException(data.result, HttpStatusCode.BAD_REQUEST);
    }

    const txFromEtherscan = mapTx(data.result, rest);
    const tx = await this.transactionModel.create(txFromEtherscan);
    // await this.statisticsModel.updateOne(
    //   {id: payload.statisticsId},
      // {
      //   $inc: {
      //     totalReceived: payload.amount,
      //   }
      // }
    // )

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
