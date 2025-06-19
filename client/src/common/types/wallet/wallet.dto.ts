import { StatisticsDto } from "../stats/statistics.dto";
import { TransactionDto } from "../transaction/transaction.dto";

export type WalletDto = {
  id: string;
  name: string;
  userId: string;
  address: string;
  isSyncWithBlockchain: boolean;
  statistics: StatisticsDto;
  transactions: TransactionDto[]
}
