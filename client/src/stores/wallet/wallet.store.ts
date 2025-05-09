import { create } from "zustand";
import { WalletState, WalletStore } from "./types";
import { UserWalletAddressDto } from "@/common/types/user-wallet-address.dto";
import { walletService } from "@/services/wallet";
import { WalletFilterDto } from "@/common/types/wallet-filter.dto";

const initState: WalletState = {
  wallets: [],
  isLoading: false,
  error: null
}

export const useWalletStore = create<WalletStore>((set) => ({
  ...initState,
  loadWallets: async (query: WalletFilterDto) => {
    set({ isLoading: true, error: null });

    try {
      const wallets = await walletService.getByFilter(query);

      set({ wallets, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  importFromEtherscan: async (payload: UserWalletAddressDto) => {
    set({ isLoading: true, error: null });

    try {
      const wallets = await walletService.importFromEtherscan(payload);

      set({ wallets, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
}))
