import { Body, Controller, Get, Param, Post, Res, UseInterceptors } from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { WalletService } from './wallet.service';
import { ReportItemDto } from './dto/report-item.dto';
import { EthAddressPipe } from 'src/pipes/eth-address.pipe';
import { WalletAddressDto } from '../common/dto/wallet-address.dto';
import { TransactionDto } from '../common/dto/transaction.dto';
import { Files } from 'src/decorators/files.decorator';
import { MultipartInterceptor } from 'src/interceptors/files.interceptor';

@Controller(ApiPath.WALLETS)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/import-from-etherscan')
  async importTransactionsFromEtherscan(
    @Body() payload: WalletAddressDto
  ): Promise<TransactionDto[]> {
    const txs = await this.walletService.importTransactionsFromEtherscan(payload.address);

    return txs;
  }

  @Post('/import-from-csv')
  @UseInterceptors(MultipartInterceptor({fileType: 'csv' }))
  async importTransactionsFromCsvFile(
    @Files() files: Record<string, Storage.MultipartFile[]>, 
    @Body() payload: WalletAddressDto
  ) {
    const txs = await this.walletService.importTransactionsFromCsv(files, payload.address);
    
    return txs;
  }

  @Post('/export-to-csv')
  async exportTransactionsToCsv(
    @Body() payload: WalletAddressDto,
    @Res({ passthrough: true }) res: App.Response
  ) {
    const csv = await this.walletService.exportTransactionsToCsv(payload.address);

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', `attachment; filename="${payload.address}.csv"`);

    return csv;
  }

  @Get('/check/:address')
  async checkUserAddress(
    @Param('address', EthAddressPipe) address: string
  ): Promise<ReportItemDto[]> {
    const report = await this.walletService.checkUserAddress(address);

    return report;
  }
}
