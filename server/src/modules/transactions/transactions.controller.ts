import { 
  Body, 
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors 
} from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { ObjectIdPipe } from 'src/pipes/object-id.pipe';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from '../common/dto/transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactiontDto } from './dto/update-transaction.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Files } from 'src/decorators/files.decorator';
import { MultipartInterceptor } from 'src/interceptors/files.interceptor';
import { TransactionFilterDto } from './dto/transaction-filter.dto';

@Controller(ApiPath.TRANSACTIONS)
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(
    private readonly txService: TransactionsService,
  ) {}

  @Get()
  async getByFilter(
    @Query() query: TransactionFilterDto
  ): Promise<TransactionDto[]> {
    const txs = await this.txService.getByFilter(query);

    return txs;
  } 

  @Post()
  async create(
    @Body() payload: CreateTransactionDto
  ) {
    const tx = await this.txService.create(payload);

    return tx;
  }

  @Get(ApiPath.ID)
  async getById(
    @Param('id', ObjectIdPipe) id: string
  ): Promise<TransactionDto> {
    const tx = await this.txService.getById(id);

    return tx;
  }

  @Patch(ApiPath.ID)
  async updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() payload: UpdateTransactiontDto
  ): Promise<TransactionDto> {
    const tx = await this.txService.updateById(id, payload);

    return tx;
  }

  @Delete(ApiPath.ID)
  async deleteById(
    @Param('id', ObjectIdPipe) id: string
  ): Promise<{ message: string }> {
    await this.txService.deleteById(id);

    return { message: 'Transaction deleted successfully' };
  }

  @Post(ApiPath.IMPORT_FROM_CSV)
  @UseInterceptors(MultipartInterceptor({fileType: 'csv' }))
  async importTransactionsFromCsvFile(
    @Files() files: Record<string, Storage.MultipartFile[]>, 
    @Body() payload: Pick<TransactionDto, 'walletId'>
  ) {
    const txs = await this.txService.importFromCsv(files, payload);

    return txs;
  }

  @Get(ApiPath.EXPORT_TO_CSV)
  async exportTransactionsToCsv(
    @Query() filter: TransactionFilterDto,
    @Res({ passthrough: true }) res: App.Response
  ) {
    const csv = await this.txService.exportToCsv(filter);

    res.header('Content-Type', 'text/csv');
    res.header("Access-Control-Expose-Headers", "Content-Disposition");
    res.header('Content-Disposition', `attachment; filename="${filter.walletId ?? 'all-transactions'}.csv"`);

    return csv;
  }
}
