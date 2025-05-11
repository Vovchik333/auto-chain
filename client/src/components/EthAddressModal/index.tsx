import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function EthAddressModalContent({
  onSubmit,
  onClose,
}: {
  onSubmit: (address: string) => void;
  onClose: () => void;
}) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const isValidEthAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  const handleSubmit = () => {
    if (!isValidEthAddress(address)) {
      setError("Invalid Ethereum address");
      return;
    }
    onSubmit(address);
    onClose();
    setAddress("");
  };

  return (
    <DialogContent className="sm:max-w-md bg-[#1A1F27] text-[#F0F0F0]">
      <DialogHeader>
        <DialogTitle className="text-[#F0F0F0]">Wallet</DialogTitle>
      </DialogHeader>
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
      <DialogFooter>
        <Button className="bg-[#00FFC6] text-[#1A1F27] hover:bg-[#00e0b3]" onClick={handleSubmit}>
          Import
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}