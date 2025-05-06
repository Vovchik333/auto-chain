import { Test, TestingModule } from '@nestjs/testing';
import { WalletAnalyticsService } from './wallet-analytics.service';

describe('WalletAnalyticsService', () => {
  let service: WalletAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletAnalyticsService],
    }).compile();

    service = module.get<WalletAnalyticsService>(WalletAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
