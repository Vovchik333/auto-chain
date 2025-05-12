import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { PrimaryButton } from "../PrimaryButton";

type Props = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSubmit: (address: string) => void;
}

export default function EthAddressModalContent({
  isOpen,
  onOpenChange,
  onSubmit,
}: Props) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const isValidEthAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  const handleSubmit = () => {
    if (!isValidEthAddress(address)) {
      setError("Invalid Ethereum address");
      return;
    }
    onSubmit(address);
    setAddress("");
  };

  return (
    <ModalWrapper 
      title="Wallet"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      modalContent={
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="eth-address" className="text-[#F0F0F0]">Address</Label>
            <Input
              id="eth-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </div>
      }
      footerButtons={
        <PrimaryButton onClick={handleSubmit}>
          Import
        </PrimaryButton>
      }
    />
  );
}
