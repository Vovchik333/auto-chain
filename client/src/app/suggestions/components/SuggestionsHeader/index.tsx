'use client';

import React from 'react';
import { WalletSelector } from '../WalletSelector';
import { WalletDto } from '@/common/types/wallet/wallet.dto';
import { PageContentTitle } from '@/components/PageContentTitle';
import { PageContentHeader } from '@/components/PageContentHeader';

interface SuggestionsHeaderProps {
  wallets: WalletDto[];
  onWalletSelect: (walletIds: string[]) => void;
}

export const SuggestionsHeader: React.FC<SuggestionsHeaderProps> = ({
  wallets,
  onWalletSelect,
}) => {
  return (
    <PageContentHeader className="flex justify-between bg-[#1A1F27]">
      <PageContentTitle text={'Suggestions for diversification'}/>
      <WalletSelector 
        wallets={wallets}
        onSelect={onWalletSelect}
      />
    </PageContentHeader>
  );
};