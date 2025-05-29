import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { PrimaryButton } from "../PrimaryButton";
import { CreateWalletFromBlockchainDto } from "@/common/types/wallet/create-wallet-from-blockchain.dto";
import { useTranslations } from 'next-intl';
import { AlertCircle } from "lucide-react";

type Props = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSubmit: (payload: Omit<CreateWalletFromBlockchainDto, 'userId'>) => void;
}

export default function EthAddressModalContent({
  isOpen,
  onOpenChange,
  onSubmit,
}: Props) {
  const t = useTranslations('wallet');
  const [payload, setPayload] = useState<Omit<CreateWalletFromBlockchainDto, 'userId'>>({
    address: '',
    name: ''
  });

  const [error, setError] = useState("");

  const isValidEthAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  const handleSetAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setPayload(prev => ({...prev, address}));
    if (error) setError("");
  }

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setPayload(prev => ({...prev, name}));
  }

  const handleSubmit = () => {
    if (!isValidEthAddress(payload.address)) {
      setError(t('invalidAddress'));
      return;
    }
    onSubmit(payload);
    setPayload({
      address: '',
      name: ''
    });
  };

  return (
    <ModalWrapper 
      title={t('importWallet')}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      modalContent={
        <div className="space-y-6 py-2">
          <div className="space-y-4">
            <div className="space-y-2.5">
              <Label 
                htmlFor="eth-address" 
                className="text-foreground theme-transition"
              >
                {t('address')}:
              </Label>
              <Input
                id="eth-address"
                value={payload.address}
                onChange={handleSetAddress}
                placeholder="0x..."
                className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl placeholder-muted-foreground theme-transition"
              />
            </div>
            
            <div className="space-y-2.5">
              <Label 
                htmlFor="wallet-name" 
                className="text-foreground theme-transition"
              >
                {t('name')}:
              </Label>
              <Input
                id="wallet-name"
                value={payload.name}
                onChange={handleSetName}
                placeholder={t('walletNamePlaceholder')}
                className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl placeholder-muted-foreground theme-transition"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 text-destructive text-sm theme-transition">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        </div>
      }
      footerButtons={
        <PrimaryButton onClick={handleSubmit}>
          {t('import')}
        </PrimaryButton>
      }
    />
  );
}
