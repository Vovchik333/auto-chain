import { TransactionDto } from "./transaction/transaction.dto";

export type StatisticsDto = {
  id: string;
  balance: number;
  totalSent: number;
  totalReceived: number;
  totalTxCount: number;
  largestAmountTransaction: TransactionDto;
  totalFeeUsed: number;
};
