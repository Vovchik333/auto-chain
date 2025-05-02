import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiPath } from 'src/common/enums/api/api-path.enum';
import { ObjectIdPipe } from 'src/pipes/object-id.pipe';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from '../common/dto/transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactiontDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService
  ) {}

  @Post()
  async create(
    @Body() payload: CreateTransactionDto
  ) {
    const tx = await this.transactionsService.create(payload);

    return {
      id: tx._id,
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      date: tx.date,
      status: tx.status,
      gasUsed: tx.gasUsed,
      block: tx.block,
      method: tx.method,
      confirmations: tx.confirmations,
      txnFee: tx.txnFee,
      category: tx.category,
      ownerAddress: tx.ownerAddress
    };
  }

  @Get(ApiPath.ID)
  async getById(
    @Param('id', ObjectIdPipe) id: string
  ): Promise<TransactionDto> {
    const tx = await this.transactionsService.getById(id);

    return {
      id: tx._id,
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      date: tx.date,
      status: tx.status,
      gasUsed: tx.gasUsed,
      block: tx.block,
      method: tx.method,
      confirmations: tx.confirmations,
      txnFee: tx.txnFee,
      category: tx.category,
      ownerAddress: tx.ownerAddress,
    };
  }

  @Patch(ApiPath.ID)
  async updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() payload: UpdateTransactiontDto
  ): Promise<TransactionDto> {
    const tx = await this.transactionsService.updateById(id, payload);

    return {
      id: tx._id,
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      date: tx.date,
      status: tx.status,
      gasUsed: tx.gasUsed,
      block: tx.block,
      method: tx.method,
      confirmations: tx.confirmations,
      txnFee: tx.txnFee,
      category: tx.category,
      ownerAddress: tx.ownerAddress,
    };;
  }
}
