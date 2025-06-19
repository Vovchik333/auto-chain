'use client'

import TransactionsSection from "@/app/transactions/components/TransactionsSection";
import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useEffect } from "react";
import TransactionsHeader from "./components/TransactionHeader";
import { Loader2, Plus } from "lucide-react";
import { useTranslations } from 'next-intl';

function Transactions() {
  const t = useTranslations('transaction');
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
    <div className="min-h-screen bg-background theme-transition">
      <div className="mx-auto space-y-6">
        <TransactionsHeader />
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-primary theme-transition">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{t('loading')}</span>
            </div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center rounded-box-xl bg-secondary border-border theme-transition">
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4 theme-transition">
              <Plus className="w-8 h-8 text-primary theme-transition" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2 theme-transition">
              {t('noTransactions')}
            </h3>
            <p className="text-muted-foreground max-w-sm theme-transition">
              {t('noTransactionsDescription')}
            </p>
          </div>
        ) : (
          <div className="rounded-box-xl bg-background theme-transition">
            <TransactionsSection 
              tableTitle={t('allTransactions')} 
              transactions={transactions} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default withPrivateRoute(Transactions);
