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
    onClose(); // закриває модалку
    setAddress("");
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Enter Ethereum Address</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="eth-address">Address</Label>
          <Input
            id="eth-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>Import</Button>
      </DialogFooter>
    </DialogContent>
  );
}