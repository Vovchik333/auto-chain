import { Test, TestingModule } from '@nestjs/testing';
import { WalletAnalyticsController } from './wallet-analytics.controller';

describe('WalletAnalyticsController', () => {
  let controller: WalletAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletAnalyticsController],
    }).compile();

    controller = module.get<WalletAnalyticsController>(WalletAnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
