import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { BlockchainSyncService } from './blockchain-sync.service';
import { BlockchainSyncController } from './blockchain-sync.controller';
import { Transaction, TransactionSchema } from 'src/schemas/transaction.schema';
import { Wallet, WalletSchema } from 'src/schemas/wallet.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Wallet.name, schema: WalletSchema },
    ]),
  ],
  controllers: [BlockchainSyncController],
  providers: [BlockchainSyncService],
  exports: [BlockchainSyncService],
})
export class BlockchainSyncModule {} 