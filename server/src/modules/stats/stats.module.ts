import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Statistics, StatisticsSchema } from 'src/schemas/statistics.schema';
import { Transaction, TransactionSchema } from 'src/schemas/transaction.schema';
import { StatsListener } from './listeners/stats.listener';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Statistics.name, schema: StatisticsSchema },
      { name: Transaction.name, schema: TransactionSchema }
    ])
  ],
  providers: [StatsService, StatsListener],
})
export class StatsModule {}
