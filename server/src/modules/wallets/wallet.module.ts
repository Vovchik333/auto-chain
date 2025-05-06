import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'src/schemas/transaction.schema';
import { WalletAnalytics, WalletAnalyticsSchema } from 'src/schemas/wallet-analytics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: WalletAnalytics.name, schema: WalletAnalyticsSchema }
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
