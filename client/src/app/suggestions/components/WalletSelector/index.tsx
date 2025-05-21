'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { WalletDto } from '@/common/types/wallet/wallet.dto';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ModalWrapper } from '@/components/ModalWrapper';
import { Loader2 } from 'lucide-react';

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
            Processing...
          </>
        ) : (
          <>Select Wallets ({wallets.filter(w => w.address).length})</>
        )}
      </PrimaryButton>
      <ModalWrapper 
        isOpen={open}
        title="Select Wallets"
        onOpenChange={setOpen}
        modalContent={
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {wallets.filter(wallet => wallet.address).map((wallet) => (
              <label key={wallet.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-[#2A2F38] rounded transition-colors">
                <Checkbox
                  checked={localSelection.includes(wallet.id)}
                  onCheckedChange={() => toggleWallet(wallet.id)}
                  className="data-[state=checked]:text-[#00FFC6] data-[state=checked]:border-[#00FFC6] border-[#A3A3A3]"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-[#F0F0F0] font-medium">{wallet.name}</span>
                  <span className="text-xs text-[#A3A3A3]">{wallet.address}</span>
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
            Confirm Selection
          </PrimaryButton>
        }
      />
    </>
  );
};