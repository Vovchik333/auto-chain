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

type TransactionType = 'deposit' | 'withdraw';

export default function AddTransactionButton() {
  const { createTx, error: txError, resetError } = useTransactionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState<CreateTxDto>({
    from: '',
    type: 'deposit',
    to: '',
    value: '0',
    date: new Date().toISOString(),
    txnFee: '0',
    category: DEFAULT_CATEGORIES[0].id,
    walletId: ''
  });

  const handleImportClick = () => {
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
    createTx(payload);
    setPayload({
      from: '',
      to: '',
      value: '0',
      date: new Date().toISOString(),
      txnFee: '0',
      walletId: '',
      type: 'deposit',
      category: DEFAULT_CATEGORIES[0].id
    });
    setIsModalOpen(false);
  };

  const modalContent = (
    <div className="space-y-6">
      <RadioGroup
        defaultValue="deposit"
        value={payload.type}
        onValueChange={handleTransactionTypeChange}
        className="grid grid-cols-2 gap-4"
      >
        <TransactionTypeCard 
          type="deposit" 
          label="Deposit" 
          isSelected={payload.type === 'deposit'} 
        />
        <TransactionTypeCard 
          type="withdraw" 
          label="Withdraw" 
          isSelected={payload.type === 'withdraw'} 
        />
      </RadioGroup>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Value (ETH)</Label>
          <Input
            type="number"
            placeholder="0.0"
            value={payload.value}
            onChange={handleSetValue}
          />
        </div>
        <div className="space-y-2">
          <Label>Fee (ETH)</Label>
          <Input
            type="number"
            placeholder="0.0"
            value={payload.txnFee}
            onChange={handleSetFee}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>From Address</Label>
        <Input
          placeholder="0x..."
          value={payload.from}
          onChange={handleSetFrom}
        />
      </div>

      <div className="space-y-2">
        <Label>To Address</Label>
        <Input
          placeholder="0x..."
          value={payload.to}
          onChange={handleSetTo}
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <CategorySelect
          categories={DEFAULT_CATEGORIES}
          value={payload.category}
          onValueChange={handleSetCategory}
        />
      </div>

      <div className="space-y-2">
        <WalletList 
          walletId={payload.walletId} 
          onSetWalletId={handleSetWalletId} 
        />
      </div>
    </div>
  );

  return (
    <>
      <SecondaryButton onClick={handleImportClick}>
        Add Transaction
      </SecondaryButton>

      <ModalWrapper
        title="Add Transaction"
        isOpen={isModalOpen}
        modalContent={modalContent}
        footerButtons={
          <>
            <SecondaryButton onClick={() => setIsModalOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={handleSubmit}>
              Add Transaction
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