import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { WalletService } from './wallet.service';
import { UserWalletAddressDto } from '../common/dto/user-wallet-address.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { WalletDto } from '../common/dto/wallet.dto';
import { WalletFilterDto } from './dto/wallet-filter.dto';
import { TransferInstruction } from './dto/transfer-instruction.dto';
import { DiversificationDto } from './dto/diversification.dto';
import { StatisticsDto } from 'src/common/types/statistics.dto';

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

  @Get('/user-stats/:id')
  async getUserStats(
    @Param() id: string
  ): Promise<StatisticsDto> {
    const wallets = await this.walletService.findByFilter({userId: id});

    const stats = wallets.reduce((acc, cur) => {
      return {
        totalReceived: acc.totalReceived + cur.statistics.totalReceived,
        totalSent: acc.totalSent + cur.statistics.totalSent,
        totalFeeUsed: acc.totalFeeUsed + cur.statistics.totalFeeUsed,
        totalTxCount: acc.totalTxCount + cur.statistics.totalTxCount,
        largestAmountTransaction: acc.largestAmountTransaction.value < cur.statistics.largestAmountTransaction.value ? cur.statistics.largestAmountTransaction : acc.largestAmountTransaction,
      };
    }, {
      totalReceived: 0,
      totalSent: 0,
      totalFeeUsed: 0,
      totalTxCount: 0,
      largestAmountTransaction: wallets[0].statistics.largestAmountTransaction
    });

    return stats as StatisticsDto;
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
