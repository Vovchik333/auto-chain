'use client'

import { ChangeEvent, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { SecondaryButton } from "@/components/SecondaryButton";
import { ModalWrapper } from "@/components/ModalWrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { WalletList } from "../WalletList";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { ErrorModal } from "@/components/Erorr/ErrorModal";
import { CreateTxDto } from "@/common/types/transaction/create-tx.dto";
import { RadioGroup } from "@/components/ui/radio-group";
import { CategorySelect } from "@/components/ui/category-select";
import { DEFAULT_CATEGORIES } from "@/common/types/category";
import { TransactionTypeCard } from "../TransactionTypeCard";
import { useTranslations } from 'next-intl';
import { TransactionDto } from "@/common/types/transaction/transaction.dto";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  transaction: TransactionDto;
};

type TransactionType = 'deposit' | 'withdraw';

export default function UpdateTransactionButton({ transaction }: Props) {
  const t = useTranslations('transaction');
  const { updateTx, error: txError, resetError } = useTransactionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState<CreateTxDto>({
    from: transaction.from,
    type: transaction.type,
    to: transaction.to,
    value: transaction.value,
    date: transaction.date,
    txnFee: transaction.txnFee,
    category: transaction.category,
    walletId: transaction.walletId
  });

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleTransactionTypeChange = (value: string) => {
    const type = value as TransactionType;
    setPayload(prev => ({
      ...prev,
      type
    }));
  };

  const handleSetFrom = (e: ChangeEvent<HTMLInputElement>) => {
    const from = e.target.value;
    setPayload(prev => ({...prev, from}));
  }

  const handleSetTo = (e: ChangeEvent<HTMLInputElement>) => {
    const to = e.target.value;
    setPayload(prev => ({...prev, to}));
  }

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPayload(prev => ({...prev, value}));
  }

  const handleSetFee = (e: ChangeEvent<HTMLInputElement>) => {
    const txnFee = e.target.value;
    setPayload(prev => ({...prev, txnFee}));
  }

  const handleSetWalletId = (walletId: string) => {
    setPayload(prev => ({...prev, walletId}));
  }

  const handleSetCategory = (category: string) => {
    setPayload(prev => ({...prev, category}));
  }

  const handleSubmit = () => {
    updateTx(transaction.id, payload);
    setIsModalOpen(false);
  };

  const modalContent = (
    <div className="space-y-6">
      <RadioGroup
        defaultValue={transaction.type}
        value={payload.type}
        onValueChange={handleTransactionTypeChange}
        className="grid grid-cols-2 gap-4"
      >
        <TransactionTypeCard 
          type="deposit" 
          label={t('deposit')} 
          isSelected={payload.type === 'deposit'} 
        />
        <TransactionTypeCard 
          type="withdraw" 
          label={t('withdraw')} 
          isSelected={payload.type === 'withdraw'} 
        />
      </RadioGroup>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2.5">
          <Label className="text-foreground theme-transition">{t('amount')} (ETH)</Label>
          <Input
            type="number"
            placeholder="0.0"
            value={payload.value}
            onChange={handleSetValue}
            className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl placeholder-muted-foreground theme-transition"
          />
        </div>
        <div className="space-y-2.5">
          <Label className="text-foreground theme-transition">{t('fee')} (ETH)</Label>
          <Input
            type="number"
            placeholder="0.0"
            value={payload.txnFee}
            onChange={handleSetFee}
            className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl placeholder-muted-foreground theme-transition"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <Label className="text-foreground theme-transition">{t('from')}</Label>
        <Input
          placeholder="0x..."
          value={payload.from}
          onChange={handleSetFrom}
          className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl placeholder-muted-foreground theme-transition"
        />
      </div>

      <div className="space-y-2.5">
        <Label className="text-foreground theme-transition">{t('to')}</Label>
        <Input
          placeholder="0x..."
          value={payload.to}
          onChange={handleSetTo}
          className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl placeholder-muted-foreground theme-transition"
        />
      </div>

      <div className="space-y-2.5">
        <Label className="text-foreground theme-transition">{t('category')}</Label>
        <CategorySelect
          categories={DEFAULT_CATEGORIES}
          value={payload.category}
          onValueChange={handleSetCategory}
          className="bg-secondary/50 text-foreground border-border focus:ring-primary focus:border-primary rounded-xl theme-transition"
        />
      </div>

      <div className="space-y-2.5">
        <WalletList 
          walletId={payload.walletId} 
          onSetWalletId={handleSetWalletId} 
        />
      </div>
    </div>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleEditClick}
        className="h-8 w-8 p-0"
      >
        <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
      </Button>

      <ModalWrapper
        title={t('editTransaction')}
        isOpen={isModalOpen}
        modalContent={modalContent}
        footerButtons={
          <>
            <SecondaryButton onClick={() => setIsModalOpen(false)}>
              {t('cancel')}
            </SecondaryButton>
            <PrimaryButton 
              onClick={handleSubmit}
              disabled={!payload.walletId || !payload.from || !payload.to || payload.value === '0'}
            >
              {t('save')}
            </PrimaryButton>
          </>
        }
        onOpenChange={setIsModalOpen}
      />
      {txError && (
        <ErrorModal
          error={txError}
          onClose={resetError}
        />
      )}
    </>
  );
} 