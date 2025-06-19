import { TransactionDto } from "./transaction/transaction.dto";

export type StatisticsDto = {
  id: string;
  balance: string;
  totalSent: string;
  totalReceived: string;
  totalTxCount: number;
  largestAmountTransaction: TransactionDto;
  totalFeeUsed: string;
};
