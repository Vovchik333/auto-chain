import { Module } from '@nestjs/common';
import { WalletDataController } from './wallet-data.controller';
import { WalletDataService } from './wallet-data.service';

@Module({
  controllers: [WalletDataController],
  providers: [WalletDataService]
})
export class WalletDataModule {}
