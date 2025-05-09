import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { WalletService } from './wallet.service';
import { UserWalletAddressDto } from '../common/dto/user-wallet-address.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { WalletDto } from '../common/dto/wallet.dto';
import { WalletFilterDto } from './dto/wallet-filter.dto';

@Controller(ApiPath.WALLETS)
@UseGuards(AuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  async getByFilter(
    @Query() query: WalletFilterDto
  ): Promise<WalletDto[]> {
    const wallets = await this.walletService.findByFilter(query);

    return wallets;
  }

  @Post('/import-from-etherscan')
  async importTransactionsFromEtherscan(
    @Body() payload: UserWalletAddressDto
  ): Promise<WalletDto[]> {
    const wallets = await this.walletService.importTransactionsFromEtherscan(payload);

    return wallets;
  }

  // @Get('/check/:address')
  // async checkUserAddress(
  //   @Param('address', EthAddressPipe) address: string
  // ): Promise<ReportItemDto[]> {
  //   const report = await this.walletService.checkUserAddress(address);

  //   return report;
  // }
}
