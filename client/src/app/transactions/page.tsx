'use client'

import TransactionsSection from "@/components/TransactionsSection";
import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useEffect } from "react";
import TransactionsHeader from "./components/TransactionHeader";

function Transactions() {
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
      <TransactionsHeader />
      <TransactionsSection 
        tableTitle={'All Transactions'} 
        transactions={transactions} 
      />
    </>
  );
}

export default withPrivateRoute(Transactions);
