import { OnEvent } from '@nestjs/event-emitter';
import { StatsService } from '../stats.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatsListener {
  constructor(private readonly statsService: StatsService) {}

  @OnEvent('transaction.created', { async: true })
  async handleTransactionCreated(payload: {
    userId: string
  }) {
    await this.statsService.updateUserStats(payload.userId);
  }
}