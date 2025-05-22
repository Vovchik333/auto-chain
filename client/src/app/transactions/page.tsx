'use client'

import TransactionsSection from "@/app/transactions/components/TransactionsSection";
import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useEffect } from "react";
import TransactionsHeader from "./components/TransactionHeader";
import { Loader2 } from "lucide-react";

function Transactions() {
  const { user } = useUserStore()
  const { transactions, loadTransactions, isLoading: isLoadingTransactions } = useTransactionStore();
  const { wallets, loadWallets , isLoading: isLoadingWallets} = useWalletStore();
  const isLoading = isLoadingWallets && isLoadingTransactions;

  useEffect(() => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;
    loadTransactions({userId});
    loadWallets({userId});
  }, [user]);

  useEffect(() => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;
    loadTransactions({userId});
  }, [user, wallets]);

  return (
    <div
      className="min-h-screen bg-[#1A1F27] p-6"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <TransactionsHeader />
        {isLoading ? (
          <div
            className="flex items-center justify-center py-12"
          >
            <div className="flex items-center gap-2 text-[#00FFC6]">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading transactions...</span>
            </div>
          </div>
        ) : transactions.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#2A2F38] flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-[#00FFC6]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#F0F0F0] mb-2">No transactions yet</h3>
            <p className="text-[#A3A3A3] max-w-sm">
              Get started by adding your first transaction or importing from CSV
            </p>
          </div>
        ) : (
          <TransactionsSection 
            tableTitle={'All Transactions'} 
            transactions={transactions} 
          />
        )}
      </div>
    </div>
  );
}

export default withPrivateRoute(Transactions);
