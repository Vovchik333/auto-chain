import { TransactionDto } from "@/common/types/transaction.dto";
import { WalletAddressDto } from "@/common/types/wallet-address.dto";

export type WalletState = {
  transactions: TransactionDto[];
  isLoading: boolean;
  error: string | null;
}

export type WalletActions = {
  loadTransactions: (ownerAddress: string) => Promise<void>,
  importFromCsv: (payload: FormData) => Promise<void>;
  importFromEtherscan: (payload: WalletAddressDto) => Promise<void>;
  exportToCsv: (payload: WalletAddressDto) => Promise<void>;
}

export type WalletStore = WalletState & WalletActions;
