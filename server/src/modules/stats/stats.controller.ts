import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { StatsService } from './stats.service';
import { TransactionFilterDto } from '../transactions/dto/transaction-filter.dto';
import { ApiPath } from 'src/common/enums/api/api-path.enum';

@Controller(ApiPath.STATS)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getByFilter(@Query() filter: TransactionFilterDto) {
    const stats = await this.statsService.getByFilter(filter);

    return stats;
  }

  @Post(ApiPath.EXPORT_TO_CSV)
  async exportTransactionsToCsv(
    @Body() payload: TransactionFilterDto,
    @Res({ passthrough: true }) res: App.Response
  ) {
    const csv = await this.statsService.exportToCsv(payload);

    res.header('Content-Type', 'text/csv');
    res.header("Access-Control-Expose-Headers", "Content-Disposition");
    res.header('Content-Disposition', `attachment; filename="${payload.walletId ?? 'all-transactions'}.csv"`);

    return csv;
  }
}
