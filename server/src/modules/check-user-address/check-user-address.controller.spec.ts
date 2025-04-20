import { Test, TestingModule } from '@nestjs/testing';
import { CheckUserAddressController } from './check-user-address.controller';

describe('CheckUserAddressController', () => {
  let controller: CheckUserAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckUserAddressController],
    }).compile();

    controller = module.get<CheckUserAddressController>(CheckUserAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
