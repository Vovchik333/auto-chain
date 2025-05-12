'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useUserStore } from "@/stores/user/user.store";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ModalWrapper } from "@/components/ModalWrapper";

export default function AddWalletButton() {
  const { user } = useUserStore();
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
    setName("");
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="bg-[#2A2F38] text-[#F0F0F0] border-none hover:bg-[#3A3F48] hover:text-[#00FFC6] transition-colors cursor-pointer"
        onClick={handleImportClick}
      >
        Create Wallet
      </Button>
      <ModalWrapper 
        isOpen={isModalOpen}
        title="Create Wallet"
        onOpenChange={setIsModalOpen}
        modalContent={
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="wallet-name" className="text-[#F0F0F0]">Name</Label>
              <Input
                id="wallet-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Cosmos"
                className="bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </div>
        }
        footerButtons={
          <PrimaryButton onClick={handleSubmit}>
            Create
          </PrimaryButton>
        }
      />
    </>
  );
}