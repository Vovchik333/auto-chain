import { TransactionDto } from "./transaction.dto";

export type StatisticsDto = {
  id: string;
  totalSent: number;
  totalReceived: number;
  totalTxCount: number;
  largestAmountTransaction: TransactionDto;
  totalFeeUsed: number;
};
