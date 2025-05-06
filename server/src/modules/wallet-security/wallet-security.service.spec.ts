import { Test, TestingModule } from '@nestjs/testing';
import { WalletSecurityService } from './wallet-security.service';

describe('WalletSecurityService', () => {
  let service: WalletSecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletSecurityService],
    }).compile();

    service = module.get<WalletSecurityService>(WalletSecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
