import { create } from "zustand";
import { TransactionState, TransactionStore } from "./types";
import { transactionService } from "@/services/transaction";
import { UserWalletAddressDto } from "@/common/types/user-wallet-address.dto";
import { TransactionFilterDto } from "@/common/types/transaction/transaction-filter.dto";
import { CreateTxDto } from "@/common/types/transaction/create-tx.dto";

const initState: TransactionState = {
  transactions: [],
  selectedTransaction: null,
  isLoading: false,
  error: null
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  ...initState,
  resetError: async () => {
    set({ error: null })
  },
  loadTransactions: async (filter: TransactionFilterDto) => {
    set({ isLoading: true, error: null });

    try {
      const transactions = await transactionService.getByFilter(filter);

      set({ transactions, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  createTx: async (payload: CreateTxDto) => {
    set({ isLoading: true, error: null });

    try {
      const tx = await transactionService.create(payload);

      set({ transactions: [...get().transactions, tx], isLoading: false })
    } catch (err: any) {
      console.log(err);
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
  updateTx: async (id: string, payload: Partial<CreateTxDto>) => {
    set({ isLoading: true, error: null });

    try {
      const updatedTx = await transactionService.update(id, payload);
      const transactions = get().transactions.map(tx => 
        tx.id === id ? updatedTx : tx
      );

      set({ 
        transactions,
        selectedTransaction: updatedTx,
        isLoading: false 
      });
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false });
    }
  },
  deleteTx: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      await transactionService.delete(id);
      const transactions = get().transactions.filter(tx => tx.id !== id);

      set({ 
        transactions,
        selectedTransaction: null,
        isLoading: false 
      });
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false });
    }
  },
  getTransactionById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const selectedTransaction = await transactionService.getById(id);

      set({ selectedTransaction, isLoading: false })
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
