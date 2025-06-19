import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { BlockchainSyncService } from './blockchain-sync.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('blockchain-sync')
@UseGuards(AuthGuard)
export class BlockchainSyncController {
  constructor(private readonly blockchainSyncService: BlockchainSyncService) {}

  // @Post('wallet/:id')
  // async syncWallet(@Param('id') id: string) {
  //   return this.blockchainSyncService.syncWalletById(id);
  // }
} 