import { create } from "zustand";
import { WalletState, WalletStore } from "./types";
import { walletService } from "@/services/wallet";
import { WalletFilterDto } from "@/common/types/wallet/wallet-filter.dto";
import { CreateWalletFromBlockchainDto } from "@/common/types/wallet/create-wallet-from-blockchain.dto";
import { CreateWalletDto } from "@/common/types/wallet/create-wallet.dto";
import { WalletDto } from "@/common/types/wallet/wallet.dto";

const initState: WalletState = {
  wallets: [],
  isLoading: false,
  error: null,
  globalStats: null
}

export const useWalletStore = create<WalletStore>((set, get) => ({
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
  createWallet: async (payload: CreateWalletDto) => {
    set({ isLoading: true, error: null });

    try {
      const wallet = await walletService.create(payload);

      set({ wallets: [...get().wallets, wallet], isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  importFromEtherscan: async (payload: CreateWalletFromBlockchainDto) => {
    set({ isLoading: true, error: null });

    try {
      const wallet = await walletService.importFromEtherscan(payload);

      set({ wallets: [...get().wallets, wallet], isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  updateWallet: async (id: string, payload: Partial<WalletDto>) => {
    set({ isLoading: true, error: null });

    try {
      const updatedWallet = await walletService.update(id, payload);

      set(state => ({
        wallets: state.wallets.map(wallet =>
          wallet.id === id ? updatedWallet : wallet
        ),
        isLoading: false
      }));
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  deleteWallet: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await walletService.delete(id);

      set(state => ({
        wallets: state.wallets.filter(wallet => wallet.id !== id),
        isLoading: false
      }));
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  getGlobalStats: async (userId: string) => {
    set({ isLoading: true, error: null });

    try {
      const globalStats = await walletService.getGlobalStats(userId);

      set({ globalStats, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
}))
