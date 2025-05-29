import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { PrimaryButton } from "../PrimaryButton";
import { CreateWalletFromBlockchainDto } from "@/common/types/wallet/create-wallet-from-blockchain.dto";
import { useTranslations } from 'next-intl';

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
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="eth-address" className="text-[#F0F0F0]">{t('address')}:</Label>
            <Input
              id="eth-address"
              value={payload.address}
              onChange={handleSetAddress}
              placeholder="0x..."
              className="bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
            />
            <Label htmlFor="wallet-name" className="text-[#F0F0F0]">{t('name')}:</Label>
            <Input
              id="wallet-name"
              value={payload.name}
              onChange={handleSetName}
              placeholder={t('walletNamePlaceholder')}
              className="bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
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
