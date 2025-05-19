import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'src/schemas/transaction.schema';
import { Wallet, WalletSchema } from 'src/schemas/wallet.schema';
import { SharedModule } from 'src/shared/shared.module';
import { Statistics, StatisticsSchema } from 'src/schemas/statistics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: Statistics.name, schema: StatisticsSchema }
    ]),
    SharedModule
  ],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
