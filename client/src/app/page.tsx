'use client'

import Dashboard from "@/app/(overview)/components/Dashboard";
import WalletStats from "@/components/WalletStats";
import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useEffect } from "react";
import { OverviewHeader } from "./(overview)/components/OverviewHeader";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function Home() {
  const { user } = useUserStore();
  const { loadTransactions, isLoading: isLoadingTransactions } = useTransactionStore();
  const { 
    wallets, 
    globalStats, 
    getGlobalStats, 
    loadWallets,
    isLoading: isLoadingWallets 
  } = useWalletStore();

  const isLoading = isLoadingTransactions || isLoadingWallets || !globalStats;

  useEffect(() => {
    if (!user) return;

    const { id: userId } = user;
    
    Promise.all([
      loadTransactions({ userId }),
      loadWallets({ userId }),
      getGlobalStats(userId)
    ]);
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 text-[#00FFC6] animate-spin" />
          <p className="text-[#A3A3A3]">Loading your portfolio...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <OverviewHeader />
      <WalletStats stats={globalStats} />
      <Dashboard />
    </motion.div>
  );
}

export default withPrivateRoute(Home);
