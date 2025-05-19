'use client'

import { withPrivateRoute } from '@/hoc/with-private-route.hoc';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { SuggestionsHeader } from './components/SuggestionsHeader';
import { useSuggestionsStore } from '@/stores/suggestions/suggestions.store';
import { useWalletStore } from '@/stores/wallet/wallet.store';
import { useUserStore } from '@/stores/user/user.store';
import { SuggestionsSection } from './components/SuggestionsSection';

const SuggestionsPage: NextPage = () => {
  const { diversification, getDiversification } = useSuggestionsStore();
  const { wallets, loadWallets } = useWalletStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;

    loadWallets({userId});
  }, [user]);

  const handleWalletSelect = (walletIds: string[]) => {
    getDiversification(walletIds);
  }

  return (
    <>
      <SuggestionsHeader wallets={wallets} onWalletSelect={handleWalletSelect} />
      {diversification !== null && (
        <SuggestionsSection diversification={diversification} />
      )}
    </>
  );
};

export default withPrivateRoute(SuggestionsPage);
