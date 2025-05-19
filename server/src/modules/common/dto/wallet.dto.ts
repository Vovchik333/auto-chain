import { StatisticsDto } from "src/common/types/statistics.dto";
import { TransactionDto } from "./transaction.dto";

export type WalletDto = {
  id: string;
  userId: string;
  address: string;
  statistics: StatisticsDto;
  transactions: TransactionDto[]
}
