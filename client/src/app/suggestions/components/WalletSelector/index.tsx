'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { WalletDto } from '@/common/types/wallet.dto';

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-[#00FFC6] hover:bg-[#00e6b2] text-[#1A1F27] font-medium cursor-pointer transition-colors"
        >
          Select Wallets ({wallets.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1F27] border-[#2A2F38] text-[#F0F0F0]">
        <DialogHeader>
          <DialogTitle className="text-[#F0F0F0]">Select Wallets</DialogTitle>
        </DialogHeader>
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
        <div className="flex justify-end mt-4">
          <Button 
            onClick={applySelection}
            className="bg-[#2A2F38] text-[#00FFC6] hover:bg-[#00FFC6] hover:text-[#1A1F27] cursor-pointer"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};