import { Test, TestingModule } from '@nestjs/testing';
import { WalletDataService } from './wallet-data.service';

describe('WalletDataService', () => {
  let service: WalletDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletDataService],
    }).compile();

    service = module.get<WalletDataService>(WalletDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
