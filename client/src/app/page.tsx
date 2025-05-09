'use client'

import ExportToCSVButton from "@/components/ExportToCSVButton";
import ImportFromCSVButton from "@/components/ImportFromCSVButton";
import ImportFromEtherscanButton from "@/components/ImportFromEtherscanButton";
import TransactionsSection from "@/components/TransactionsSection";
import TransactionTable from "@/components/TransactionTable";
import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useEffect } from "react";

function Home() {
  const { user } = useUserStore()
  const { transactions, loadTransactions } = useTransactionStore();
  const { wallets, loadWallets } = useWalletStore();

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
    <>
      <h1 className="text-xl font-semibold">
        Home
      </h1>
      <div className="flex justify-end gap-4 py-4">
        <ImportFromCSVButton />
        <ImportFromEtherscanButton />
      </div>
      <TransactionsSection 
        tableTitle={'All Transactions'} 
        transactions={transactions} 
      />
      {wallets.map(wallet => {
        return (
          <TransactionsSection 
            tableTitle={`Wallet ${wallet.address}`} 
            transactions={wallet.transactions} 
            walletAddress={wallet.address}
            key={wallet.id}
          />
        )
      })}
    </>
  );
}

export default withPrivateRoute(Home);
