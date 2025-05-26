import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { WalletService } from './wallet.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { WalletDto } from '../common/dto/wallet.dto';
import { WalletFilterDto } from './dto/wallet-filter.dto';
import { DiversificationDto } from './dto/diversification.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreateWalletFromBlockchainDto } from './dto/create-wallet-from-blockchain.dto';
import { ObjectIdPipe } from 'src/pipes/object-id.pipe';

@Controller(ApiPath.WALLETS)
@UseGuards(AuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(
    @Body() payload: CreateWalletDto
  ) {
    const wallet = await this.walletService.create(payload);

    return wallet;
  }

  @Get()
  async getByFilter(
    @Query() query: WalletFilterDto
  ): Promise<WalletDto[]> {
    const wallets = await this.walletService.findByFilter(query);

    return wallets;
  }

  @Post(ApiPath.DIVERSIFICATION)
  async getSuggestionsForDiversification(
    @Body() payload: string[]
  ): Promise<DiversificationDto> {
    const suggestions = await this.walletService.getSuggestionsForDiversification(payload);

    return suggestions;
  }

  @Post(ApiPath.IMPORT_FROM_ETHERSCAN)
  async importTransactionsFromEtherscan(
    @Body() payload: CreateWalletFromBlockchainDto
  ): Promise<WalletDto> {
    const wallet = await this.walletService.importTransactionsFromEtherscan(payload);

    return wallet;
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ObjectIdPipe) id: string
  ) {
    await this.walletService.deleteById(id);

    return { message: 'Wallet deleted successfully' };
  }
}
