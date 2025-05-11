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
        <Button variant="outline">Обрати гаманці ({wallets.length})</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Обери гаманці</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {wallets.map((wallet) => (
            <label key={wallet.id} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={localSelection.includes(wallet.id)}
                onCheckedChange={() => toggleWallet(wallet.id)}
              />
              <span className="text-sm">{wallet.address}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={applySelection}>Підтвердити</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};