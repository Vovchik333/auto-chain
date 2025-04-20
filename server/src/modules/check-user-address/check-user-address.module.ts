import { Module } from '@nestjs/common';
import { CheckUserAddressController } from './check-user-address.controller';
import { CheckUserAddressService } from './check-user-address.service';

@Module({
  controllers: [CheckUserAddressController],
  providers: [CheckUserAddressService]
})
export class CheckUserAddressModule {}
