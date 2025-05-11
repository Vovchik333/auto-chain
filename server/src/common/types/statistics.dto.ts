import { TransactionDto } from "src/modules/common/dto/transaction.dto";

export type StatisticsDto = {
  id: string;
  totalSent: number;
  totalReceived: number;
  totalTxCount: number;
  largestAmountTransaction: TransactionDto;
  totalFeeUsed: number;
};
