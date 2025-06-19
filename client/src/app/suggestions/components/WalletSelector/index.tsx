'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { WalletDto } from '@/common/types/wallet/wallet.dto';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ModalWrapper } from '@/components/ModalWrapper';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface WalletSelectorProps {
  wallets: WalletDto[];
  onSelect: (walletIds: string[]) => void;
  disabled?: boolean;
}

export const WalletSelector: React.FC<WalletSelectorProps> = ({ 
  wallets, 
  onSelect,
  disabled = false 
}) => {
  const t = useTranslations('suggestions');
  const [open, setOpen] = useState(false);
  const [localSelection, setLocalSelection] = useState<string[]>(wallets.map(wallet => wallet.id));

  const toggleWallet = (id: string) => {
    setLocalSelection((prev) =>
      prev.includes(id)
        ? prev.filter((localId) => localId !== id)
        : [...prev, id]
    );
  };

  const applySelection = () => {
    onSelect(localSelection);
    setOpen(false);
  };

  const hasWalletsWithAddress = wallets.some(wallet => wallet.address);

  return (
    <>
      <PrimaryButton 
        onClick={() => setOpen(true)}
        disabled={disabled || !hasWalletsWithAddress}
        className="min-w-[160px] justify-center"
      >
        {disabled ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('processing')}
          </>
        ) : (
          <>{t('selectWallets', { count: wallets.filter(w => w.address).length })}</>
        )}
      </PrimaryButton>
      <ModalWrapper 
        isOpen={open}
        title={t('selectWalletsTitle')}
        onOpenChange={setOpen}
        modalContent={
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {wallets.filter(wallet => wallet.address).map((wallet) => (
              <label 
                key={wallet.id} 
                className="flex items-center gap-3 cursor-pointer p-3 hover:bg-secondary/70 rounded-xl transition-all theme-transition"
              >
                <Checkbox
                  checked={localSelection.includes(wallet.id)}
                  onCheckedChange={() => toggleWallet(wallet.id)}
                  className="data-[state=checked]:text-primary data-[state=checked]:border-primary border-border theme-transition"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-foreground font-medium theme-transition">{wallet.name}</span>
                  <span className="text-xs text-muted-foreground theme-transition">{wallet.address}</span>
                </div>
              </label>
            ))}
          </div>
        }
        footerButtons={
          <PrimaryButton 
            onClick={applySelection}
            disabled={localSelection.length === 0}
          >
            {t('confirmSelection')}
          </PrimaryButton>
        }
      />
    </>
  );
};