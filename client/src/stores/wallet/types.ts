import { StatisticsDto } from "@/common/types/statistics.dto";
import { UserWalletAddressDto } from "@/common/types/user-wallet-address.dto";
import { WalletFilterDto } from "@/common/types/wallet-filter.dto";
import { WalletDto } from "@/common/types/wallet.dto";

export type WalletState = {
  wallets: WalletDto[];
  isLoading: boolean;
  error: string | null;
  globalStats: StatisticsDto | null;
}

export type WalletActions = {
  loadWallets: (filter: WalletFilterDto) => Promise<void>;
  importFromEtherscan: (payload: UserWalletAddressDto) => Promise<void>;
  getGlobalStats: (userId: string) => Promise<void>;
}

export type WalletStore = WalletState & WalletActions;
