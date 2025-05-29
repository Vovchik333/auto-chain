import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { Label } from "@radix-ui/react-label";

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
      <Label htmlFor="wallet-select" className="text-foreground theme-transition">Select Wallet:</Label>
      <Select 
        value={walletId} 
        onValueChange={onSetWalletId}
      >
        <SelectTrigger 
          id="wallet-select"
          className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-box-lg w-full theme-transition"
        >
          <SelectValue placeholder="Choose a wallet" />
        </SelectTrigger>
        <SelectContent className="bg-background border-border theme-transition">
          {wallets.filter(wallet => !wallet.address).map((wallet) => (
            <SelectItem 
              key={wallet.id} 
              value={wallet.id}
              className="text-foreground hover:bg-secondary focus:bg-primary focus:text-background theme-transition"
            >
              <div className="flex items-center gap-2">
                <span>{wallet.name || 'Unnamed Wallet'}</span>
                {wallet.address && (
                  <span className="text-muted-foreground text-sm truncate theme-transition">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}