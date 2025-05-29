'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUserStore } from "@/stores/user/user.store";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ModalWrapper } from "@/components/ModalWrapper";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useTranslations } from 'next-intl';

export default function AddWalletButton() {
  const t = useTranslations('wallet');
  const { user } = useUserStore();
  const { createWallet } = useWalletStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleImportClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;
    createWallet({name, userId});
    setName("");
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="bg-secondary text-foreground border-none hover:bg-accent hover:text-primary transition-colors cursor-pointer theme-transition"
        onClick={handleImportClick}
      >
        {t('create')}
      </Button>
      <ModalWrapper 
        isOpen={isModalOpen}
        title={t('create')}
        onOpenChange={setIsModalOpen}
        modalContent={
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="wallet-name" className="text-foreground theme-transition">{t('name')}</Label>
              <Input
                id="wallet-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('walletNamePlaceholder')}
                className="bg-secondary text-foreground placeholder-muted-foreground border-border focus:ring-primary focus:border-primary rounded theme-transition"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </div>
        }
        footerButtons={
          <PrimaryButton onClick={handleSubmit}>
            {t('create')}
          </PrimaryButton>
        }
      />
    </>
  );
}