'use client'

import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useEffect } from "react";
import { OverviewHeader } from "./(overview)/components/OverviewHeader";
import { Loader2 } from "lucide-react";
import WalletStats from "@/components/WalletStats";
import { useTranslations } from 'next-intl';

function Home() {
  const t = useTranslations('overview');
  const { user } = useUserStore();
  const { loadTransactions, isLoading: isLoadingTransactions } = useTransactionStore();
  const { 
    loadWallets,
    isLoading: isLoadingWallets 
  } = useWalletStore();

  const isLoading = isLoadingTransactions || isLoadingWallets;

  useEffect(() => {
    if (!user) return;

    const { id: userId } = user;
    
    Promise.all([
      loadTransactions({ userId }),
      loadWallets({ userId }),
    ]);
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin theme-transition" />
          <p className="text-muted-foreground theme-transition">
            {t('loading')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-box-xl bg-background theme-transition">
        <OverviewHeader />
      </div>
      <div className="bg-background theme-transition">
        <WalletStats filter={{userId: user?.id}} />
      </div>
      {/* <Dashboard /> */}
    </div>
  );
}

export default withPrivateRoute(Home);
