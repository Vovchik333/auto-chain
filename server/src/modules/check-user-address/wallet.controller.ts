import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { WalletService } from './wallet.service';
import { ReportItemDto } from './dto/report-item.dto';
import { EthAddressPipe } from 'src/pipes/eth-address.pipe';
import { WalletAddressDto } from '../common/dto/wallet-address.dto';
import { TransactionDto } from './dto/transaction.dto';
import { ObjectIdPipe } from 'src/pipes/object-id.pipe';

@Controller(ApiPath.WALLETS)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/import-transactions')
  async importTransactionsFromEtherscan(
    @Body() payload: WalletAddressDto
  ): Promise<TransactionDto[]> {
    const transactions = await this.walletService.importTransactionsFromEtherscan(payload.address);

    return transactions;
  }

  // @Patch(ApiPath.ID)
  // async updateById(
  //   @Param('id', ObjectIdPipe) id: string,
  //   @Body() payload: WalletAddressDto
  // ): Promise<TransactionDto[]> {

  //   const transactions = await this.walletService.importTransactionsFromEtherscan(payload.address);

  //   return transactions;
  // }


  @Get('/check/:address')
  async checkUserAddress(
    @Param('address', EthAddressPipe) address: string
  ): Promise<ReportItemDto[]> {
    const report = await this.walletService.checkUserAddress(address);

    return report;
  }
}
