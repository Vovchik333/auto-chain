'use client';

import React from 'react';
import { WalletSelector } from '../WalletSelector';
import { WalletDto } from '@/common/types/wallet.dto';

interface SuggestionsHeaderProps {
  wallets: WalletDto[];
  onWalletSelect: (walletIds: string[]) => void;
}

export const SuggestionsHeader: React.FC<SuggestionsHeaderProps> = ({
  wallets,
  onWalletSelect,
}) => {
  return (
    <div className="flex justify-between py-4 border-b bg-[#1A1F27] mb-10">
      <h2 className="text-2xl font-semibold text-[#F0F0F0]">Suggestions for diversification</h2>

      <WalletSelector 
        wallets={wallets}
        onSelect={onWalletSelect}
      />
    </div>
  );
};