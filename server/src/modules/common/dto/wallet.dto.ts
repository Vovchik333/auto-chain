import { TransactionDto } from "./transaction.dto";

export type WalletDto = {
  id: string;
  userId: string;
  address: string;
  isSyncWithBlockchain: boolean;
  statisticsId: string;
  transactions: TransactionDto[]
}
