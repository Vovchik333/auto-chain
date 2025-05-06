import { Test, TestingModule } from '@nestjs/testing';
import { WalletSecurityController } from './wallet-security.controller';

describe('WalletSecurityController', () => {
  let controller: WalletSecurityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletSecurityController],
    }).compile();

    controller = module.get<WalletSecurityController>(WalletSecurityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
