'use client';

import React from 'react';
import { WalletSelector } from '../WalletSelector';
import { WalletDto } from '@/common/types/wallet/wallet.dto';
import { PageContentTitle } from '@/components/PageContentTitle';
import { PageContentHeader } from '@/components/PageContentHeader';

interface SuggestionsHeaderProps {
  wallets: WalletDto[];
  onWalletSelect: (walletIds: string[]) => void;
  isLoading?: boolean;
}

export const SuggestionsHeader: React.FC<SuggestionsHeaderProps> = ({
  wallets,
  onWalletSelect,
  isLoading = false,
}) => {
  return (
    <PageContentHeader className="flex justify-between items-center bg-[#1A1F27] p-6">
      <div>
        <PageContentTitle text={'Suggestions for diversification'} />
        <p className="text-[#A3A3A3] text-sm mt-1">
          Select wallets to get suggestions for optimal fund distribution
        </p>
      </div>
      <WalletSelector 
        wallets={wallets}
        onSelect={onWalletSelect}
        disabled={isLoading}
      />
    </PageContentHeader>
  );
};