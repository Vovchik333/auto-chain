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
    <div className="flex justify-between py-4 border-b bg-white">
      <h2 className="text-2xl font-semibold">Рекомендації з ребалансу</h2>

      <WalletSelector 
        wallets={wallets}
        onSelect={onWalletSelect}
      />
    </div>
  );
};