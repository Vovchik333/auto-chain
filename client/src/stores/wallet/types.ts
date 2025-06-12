import { CreateWalletFromBlockchainDto } from "@/common/types/wallet/create-wallet-from-blockchain.dto";
import { StatisticsDto } from "@/common/types/stats/statistics.dto";
import { UserWalletAddressDto } from "@/common/types/user-wallet-address.dto";
import { WalletFilterDto } from "@/common/types/wallet/wallet-filter.dto";
import { WalletDto } from "@/common/types/wallet/wallet.dto";
import { CreateWalletDto } from "@/common/types/wallet/create-wallet.dto";

export type WalletState = {
  wallets: WalletDto[];
  isLoading: boolean;
  error: string | null;
  globalStats: StatisticsDto | null;
}

export type WalletActions = {
  loadWallets: (filter: WalletFilterDto) => Promise<void>;
  createWallet: (payload: CreateWalletDto) => Promise<void>;
  importFromEtherscan: (payload: CreateWalletFromBlockchainDto) => Promise<void>;
  getGlobalStats: (userId: string) => Promise<void>;
  updateWallet: (id: string, payload: Partial<WalletDto>) => Promise<void>;
  deleteWallet: (id: string) => Promise<void>;
}

export type WalletStore = WalletState & WalletActions;
