'use client'

import { withPrivateRoute } from '@/hoc/with-private-route.hoc';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { SuggestionsHeader } from './components/SuggestionsHeader';
import { useSuggestionsStore } from '@/stores/suggestions/suggestions.store';
import { useWalletStore } from '@/stores/wallet/wallet.store';
import { useUserStore } from '@/stores/user/user.store';
import { SuggestionsSection } from './components/SuggestionsSection';
import { Skeleton } from '@/components/ui/skeleton';
import { PrimaryButton } from '@/components/PrimaryButton';
import Link from 'next/link';
import { AppRoute } from '@/common/enums/app-route';
import { useTranslations } from 'next-intl';

const SuggestionsPage: NextPage = () => {
  const t = useTranslations('suggestions');
  const { diversification, getDiversification } = useSuggestionsStore();
  const { wallets, loadWallets } = useWalletStore();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;
    loadWallets({userId});
  }, [user]);

  const handleWalletSelect = async (walletIds: string[]) => {
    try {
      setIsLoading(true);
      await getDiversification(walletIds);
    } finally {
      setIsLoading(false);
    }
  }

  const renderContent = () => {
    if (wallets.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-box-xl bg-secondary border-border theme-transition mt-4">
          <h3 className="text-xl font-semibold text-foreground mb-2 theme-transition">
            {t('noWallets.title')}
          </h3>
          <p className="text-muted-foreground mb-4 theme-transition">
            {t('noWallets.description')}
          </p>
          <Link href={AppRoute.WALLETS}>
            <PrimaryButton>
              {t('noWallets.action')}
            </PrimaryButton>
          </Link>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-24 w-full rounded-box-lg bg-secondary theme-transition" />
          <Skeleton className="h-8 w-48 rounded-box-lg bg-secondary theme-transition" />
          <div className="space-y-3">
            <Skeleton className="h-16 w-full rounded-box-lg bg-secondary theme-transition" />
            <Skeleton className="h-16 w-full rounded-box-lg bg-secondary theme-transition" />
            <Skeleton className="h-16 w-full rounded-box-lg bg-secondary theme-transition" />
          </div>
        </div>
      );
    }

    return diversification && (
      <div className="mt-4">
        <SuggestionsSection 
          diversification={diversification} 
          wallets={wallets}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <SuggestionsHeader 
        wallets={wallets} 
        onWalletSelect={handleWalletSelect}
        isLoading={isLoading}
      />
      {renderContent()}
    </div>
  );
};

export default withPrivateRoute(SuggestionsPage);
