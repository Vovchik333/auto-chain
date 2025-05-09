import { create } from "zustand";
import { TransactionState, TransactionStore } from "./types";
import { transactionService } from "@/services/transaction";
import { UserWalletAddressDto } from "@/common/types/user-wallet-address.dto";
import { TransactionFilterDto } from "@/common/types/transaction-filter.dto";

const initState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  ...initState,
  loadTransactions: async (filter: TransactionFilterDto) => {
    set({ isLoading: true, error: null });

    try {
      const transactions = await transactionService.getByFilter(filter);

      set({ transactions, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  importFromCsv: async (payload: FormData) => {
    set({ isLoading: true, error: null });

    try {
      const transactions = await transactionService.importFromCsv(payload);

      set({ transactions, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  exportToCsv: async (payload: UserWalletAddressDto) => {
    set({ isLoading: true, error: null });

    try {
      const { blob, contentDisposition } = await transactionService.exportToCsv(payload);

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
