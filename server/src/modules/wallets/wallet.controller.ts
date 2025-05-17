import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { WalletService } from './wallet.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { WalletDto } from '../common/dto/wallet.dto';
import { WalletFilterDto } from './dto/wallet-filter.dto';
import { DiversificationDto } from './dto/diversification.dto';
import { StatisticsDto } from 'src/common/types/statistics.dto';
import { Types } from 'mongoose';
import { ObjectIdPipe } from 'src/pipes/object-id.pipe';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UserIdAndWalletAddressDto } from '../common/dto/user-id-and-wallet-address.dto';
import { CreateWalletFromBlockchainDto } from './dto/create-wallet-from-blockchain.dto';

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

  @Get('/user-stats/:id')
  async getUserStats(
    @Param('id', ObjectIdPipe) id: string
  ): Promise<StatisticsDto> {
    const stats = await this.walletService.getUserStats(id);

    return stats;
  }

  @Post(ApiPath.DIVERSIFICATION)
  async getSuggestionsForDiversification(
    @Body() payload: string[]
  ): Promise<DiversificationDto> {
    const suggestions = await this.walletService.getSuggestionsForDiversification(payload);

    return suggestions;
  }

  @Post('/import-from-etherscan')
  async importTransactionsFromEtherscan(
    @Body() payload: CreateWalletFromBlockchainDto
  ): Promise<WalletDto[]> {
    const wallets = await this.walletService.importTransactionsFromEtherscan(payload);

    return wallets;
  }
}
