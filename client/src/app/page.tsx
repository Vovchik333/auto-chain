'use client'

import Dashboard from "@/app/(overview)/components/Dashboard";
import WalletStats from "@/components/WalletStats";
import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useEffect } from "react";
import { OverviewHeader } from "./(overview)/components/OverviewHeader";

function Home() {
  const { user } = useUserStore()
  const { loadTransactions } = useTransactionStore();
  const { wallets, globalStats, getGlobalStats, loadWallets } = useWalletStore();

  useEffect(() => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;

    loadTransactions({userId});
    loadWallets({userId});
    getGlobalStats(userId);
  }, [user]);

  useEffect(() => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;
    loadTransactions({userId});
  }, [user, wallets]);

  if (!globalStats) return null;

  return (
    <>
      <OverviewHeader />
      <WalletStats stats={globalStats} />
    </>
  );
}

export default withPrivateRoute(Home);
