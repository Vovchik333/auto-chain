import { TransactionDto } from "./transaction.dto";

export type WalletDto = {
  id: string;
  name: string;
  userId: string;
  address: string;
  transactions?: TransactionDto[]
}
