import { useState, useEffect } from "react";
import { ModalWrapper } from "@/components/ModalWrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { WalletDto } from "@/common/types/wallet/wallet.dto";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useTranslations } from 'next-intl';

interface Props {
  wallet: WalletDto;
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateWalletModal: React.FC<Props> = ({
  wallet,
  isOpen,
  onClose
}) => {
  const t = useTranslations('wallet');
  const { updateWallet, isLoading } = useWalletStore();
  const [name, setName] = useState(wallet.name);

  useEffect(() => {
    setName(wallet.name);
  }, [wallet.name]);

  const handleSubmit = async () => {
    await updateWallet(wallet.id, { name });
    onClose();
  };

  return (
    <ModalWrapper
      title={t('actions.updateWallet')}
      isOpen={isOpen}
      onOpenChange={onClose}
      modalContent={
        <div className="space-y-4">
          <div className="space-y-2.5">
            <Label className="text-foreground theme-transition">{t('name')}</Label>
            <Input
              placeholder={t('walletNamePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl placeholder-muted-foreground theme-transition"
            />
          </div>
        </div>
      }
      footerButtons={
        <>
          <SecondaryButton onClick={onClose} disabled={isLoading}>
            {t('actions.cancel')}
          </SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={isLoading || name.trim() === ''}>
            {t('actions.save')}
          </PrimaryButton>
        </>
      }
    />
  );
}; 