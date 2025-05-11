import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Statistics, StatisticsDocument } from 'src/schemas/statistics.schema';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { getAnalyticsFromTxs } from '../common/helpers/wallet.helper';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Statistics.name) private readonly statisticsModel: Model<StatisticsDocument>,
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async updateUserStats(userId: string) {
    const user = await this.userModel.findById(userId);
    const statsId = user.statistics;

    // getAnalyticsFromTxs();
  }
}
