import { Module } from '@nestjs/common';
import { WalletSecurityController } from './wallet-security.controller';
import { WalletSecurityService } from './wallet-security.service';

@Module({
  controllers: [WalletSecurityController],
  providers: [WalletSecurityService]
})
export class WalletSecurityModule {}
