import { StatisticsDto } from "./statistics.dto";
import { TransactionDto } from "./transaction.dto";

export type WalletDto = {
  id: string;
  userId: string;
  address: string;
  isSyncWithBlockchain: boolean;
  statistics: StatisticsDto;
  transactions: TransactionDto[]
}
