import { create } from "zustand";
import { WalletState, WalletStore } from "./types";
import { WalletAddressDto } from "@/common/types/wallet-address.dto";
import { walletService } from "@/services/wallet";

const initState: WalletState = {
  transactions: [],
  isLoading: false,
  error: null
}

export const useWalletStore = create<WalletStore>((set) => ({
  ...initState,
  loadTransactions: async (ownerAddress: string) => {
    set({ isLoading: true, error: null });

    try {
      const transactions = await walletService.getTransactions(ownerAddress);

      set({ transactions, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  importFromCsv: async (payload: FormData) => {
    set({ isLoading: true, error: null });

    try {
      const transactions = await walletService.importFromCsv(payload);

      set({ transactions, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  importFromEtherscan: async (payload: WalletAddressDto) => {
    set({ isLoading: true, error: null });

    try {
      const transactions = await walletService.importFromEtherscan(payload);

      set({ transactions, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  exportToCsv: async (payload: WalletAddressDto) => {
    set({ isLoading: true, error: null });

    try {
      const { blob, contentDisposition } = await walletService.exportToCsv(payload);

      let fileName: string = "transactions.csv";
      if (contentDisposition !== null) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        fileName = fileNameMatch ? fileNameMatch[1] : "transactions.csv";
      }

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      set({ isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  }
}))
