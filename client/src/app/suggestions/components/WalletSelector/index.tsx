'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { WalletDto } from '@/common/types/wallet.dto';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ModalWrapper } from '@/components/ModalWrapper';

interface WalletSelectorProps {
  wallets: WalletDto[];
  onSelect: (walletIds: string[]) => void;
}

export const WalletSelector: React.FC<WalletSelectorProps> = ({ wallets, onSelect }) => {
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

  return (
    <>
      <PrimaryButton 
        onClick={() => setOpen(true)}
      >
        Select Wallets ({wallets.length})
      </PrimaryButton>
      <ModalWrapper 
        isOpen={open}
        title="Select Wallets"
        onOpenChange={setOpen}
        modalContent={
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {wallets.map((wallet) => (
              <label key={wallet.id} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={localSelection.includes(wallet.id)}
                  onCheckedChange={() => toggleWallet(wallet.id)}
                  className="data-[state=checked]:text-[#00FFC6] data-[state=checked]:border-[#00FFC6] border-[#A3A3A3]"
                />
                <span className="text-sm text-[#F0F0F0]">{wallet.address}</span>
              </label>
            ))}
          </div>
        }
        footerButtons={
          <PrimaryButton onClick={applySelection}>
            Confirm
          </PrimaryButton>
        }
      />
    </>
  );
};