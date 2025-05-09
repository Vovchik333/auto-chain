import { TransactionFilterDto } from "@/common/types/transaction-filter.dto";
import { TransactionDto } from "@/common/types/transaction.dto";
import { UserWalletAddressDto } from "@/common/types/user-wallet-address.dto";

export type TransactionState = {
  transactions: TransactionDto[];
  isLoading: boolean;
  error: string | null;
}

export type TransactionActions = {
  loadTransactions: (filter: TransactionFilterDto) => Promise<void>;
  importFromCsv: (payload: FormData) => Promise<void>;
  exportToCsv: (payload: UserWalletAddressDto) => Promise<void>;
}

export type TransactionStore = TransactionState & TransactionActions;
