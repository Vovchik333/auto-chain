'use client'

import { ChangeEvent, useState } from "react";
import { useUserStore } from "@/stores/user/user.store";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { SecondaryButton } from "@/components/SecondaryButton";
import { ModalWrapper } from "@/components/ModalWrapper";
import { PrimaryButton } from "@/components/PrimaryButton";
import { WalletList } from "../WalletList";
import { useTransactionStore } from "@/stores/transaction/transaction.store";

export default function AddTransactionButton() {
  const { user } = useUserStore();
  const { createTx } = useTransactionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState({
    hash: '',
    walletId: ''
  });
  const [error, setError] = useState("");

  const handleImportClick = () => {
    setIsModalOpen(true);
  };

  const handleSetHash = (e: ChangeEvent<HTMLInputElement>) => {
    const hash = e.target.value;
    setPayload(prev => ({...prev, hash}));
  }

  const handleSetWalletId = (walletId: string) => {
    setPayload(prev => ({...prev, walletId}));
  }

  const handleSubmit = () => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;
    createTx({...payload, userId});
    setPayload({
      hash: '',
      walletId: ''
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <SecondaryButton onClick={handleImportClick}>
        Add Transaction
      </SecondaryButton>
      <ModalWrapper 
        isOpen={isModalOpen}
        title="Add Transaction"
        onOpenChange={setIsModalOpen}
        modalContent={
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="tx-hash" className="text-[#F0F0F0]">Enter Transaction Hash:</Label>
              <Input
                id="tx-hash"
                value={payload.hash}
                onChange={handleSetHash}
                placeholder="0x..."
                className="bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
            <WalletList walletId={payload.walletId} onSetWalletId={handleSetWalletId} />
          </div>
        }
        footerButtons={
          <PrimaryButton onClick={handleSubmit}>
            Add
          </PrimaryButton>
        }
      />
    </>
  );
}