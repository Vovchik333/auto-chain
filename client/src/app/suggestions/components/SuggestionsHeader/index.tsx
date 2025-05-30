'use client';

import React from 'react';
import { WalletSelector } from '../WalletSelector';
import { WalletDto } from '@/common/types/wallet/wallet.dto';
import { PageContentTitle } from '@/components/PageContentTitle';
import { PageContentHeader } from '@/components/PageContentHeader';
import { useTranslations } from 'next-intl';

type Props = {
  wallets: WalletDto[];
  onWalletSelect: (walletIds: string[]) => void;
  isLoading: boolean;
}

export const SuggestionsHeader: React.FC<Props> = ({
  wallets,
  onWalletSelect,
  isLoading
}) => {
  const t = useTranslations('suggestions');

  return (
    <PageContentHeader className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <PageContentTitle text={t('title')} />
          <p className="text-sm text-muted-foreground mt-2 theme-transition">
            {t('description')}
          </p>
        </div>
        <WalletSelector 
          wallets={wallets} 
          onSelect={onWalletSelect}
          disabled={isLoading}
        />
      </div>
    </PageContentHeader>
  );
};