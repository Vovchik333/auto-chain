import { Module } from '@nestjs/common';
import { WalletAnalyticsController } from './wallet-analytics.controller';
import { WalletAnalyticsService } from './wallet-analytics.service';

@Module({
  controllers: [WalletAnalyticsController],
  providers: [WalletAnalyticsService]
})
export class WalletAnalyticsModule {}
