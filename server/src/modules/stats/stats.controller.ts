import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';
import { TransactionFilterDto } from '../transactions/dto/transaction-filter.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getByFilter(@Query() filter: TransactionFilterDto) {
    const stats = await this.statsService.getByFilter(filter);

    return stats;
  }
}
