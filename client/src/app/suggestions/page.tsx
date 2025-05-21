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

const SuggestionsPage: NextPage = () => {
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
        <div className="flex flex-col items-center justify-center p-8 text-center bg-[#2A2F38] rounded-2xl border border-[#1A1F27] mt-4">
          <h3 className="text-xl font-semibold text-[#F0F0F0] mb-2">No Wallets Found</h3>
          <p className="text-[#A3A3A3] mb-4">Add some wallets to get diversification suggestions</p>
          <Link href={AppRoute.WALLETS}>
            <PrimaryButton>
              Add Wallet
            </PrimaryButton>
          </Link>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-24 w-full bg-[#2A2F38]" />
          <Skeleton className="h-8 w-48 bg-[#2A2F38]" />
          <div className="space-y-3">
            <Skeleton className="h-16 w-full bg-[#2A2F38]" />
            <Skeleton className="h-16 w-full bg-[#2A2F38]" />
            <Skeleton className="h-16 w-full bg-[#2A2F38]" />
          </div>
        </div>
      );
    }

    return diversification && (
      <SuggestionsSection 
        diversification={diversification} 
        wallets={wallets}
      />
    );
  };

  return (
    <>
      <SuggestionsHeader 
        wallets={wallets} 
        onWalletSelect={handleWalletSelect}
        isLoading={isLoading}
      />
      {renderContent()}
    </>
  );
};

export default withPrivateRoute(SuggestionsPage);
