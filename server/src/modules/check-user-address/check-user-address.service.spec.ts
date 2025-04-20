import { Test, TestingModule } from '@nestjs/testing';
import { CheckUserAddressService } from './check-user-address.service';

describe('CheckUserAddressService', () => {
  let service: CheckUserAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckUserAddressService],
    }).compile();

    service = module.get<CheckUserAddressService>(CheckUserAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
