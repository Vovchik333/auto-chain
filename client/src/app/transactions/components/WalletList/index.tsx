import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

type Props = {
  walletId: string;
  onSetWalletId: (walletId: string) => void;
}

export const WalletList: React.FC<Props> = ({
  walletId,
  onSetWalletId
}) => {
  const { wallets } = useWalletStore();

  return (
    <div className="grid gap-2">
      <Label htmlFor="wallet-select" className="text-[#F0F0F0]">Select Wallet:</Label>
      <Select 
        value={walletId} 
        onValueChange={onSetWalletId}
      >
        <SelectTrigger 
          id="wallet-select"
          className="bg-[#2A2F38] text-[#F0F0F0] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded w-full"
        >
          <SelectValue placeholder="Choose a wallet" />
        </SelectTrigger>
        <SelectContent className="bg-[#1A1F27] border-[#2A2F38]">
          {wallets.filter(wallet => !wallet.address).map((wallet) => (
            <SelectItem 
              key={wallet.id} 
              value={wallet.id}
              className="text-[#F0F0F0] hover:bg-[#2A2F38] focus:bg-[#00FFC6] focus:text-[#1A1F27]"
            >
              <div className="flex items-center gap-2">
                <span>{wallet.name || 'Unnamed Wallet'}</span>
                {wallet.address && (
                  <span className="text-[#A3A3A3] text-sm truncate">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}