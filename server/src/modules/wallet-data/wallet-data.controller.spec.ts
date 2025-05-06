import { Test, TestingModule } from '@nestjs/testing';
import { WalletDataController } from './wallet-data.controller';

describe('WalletDataController', () => {
  let controller: WalletDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletDataController],
    }).compile();

    controller = module.get<WalletDataController>(WalletDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
