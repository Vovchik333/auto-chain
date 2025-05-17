import { TransactionDto } from "src/modules/common/dto/transaction.dto";

export type StatisticsDto = {
  id: string;
  balance: string;
  totalSent: string;
  totalReceived: string;
  totalTxCount: number;
  largestAmountTransaction?: TransactionDto;
  totalFeeUsed: string;
};
