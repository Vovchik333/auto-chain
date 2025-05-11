import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils"; // або заміни на свій класнейм-хелпер

export default function EthAddressAndFilesModalContent({
  onSubmit,
  onClose
}: {
  onSubmit: (address: string, files: File[]) => void;
  onClose: () => void;
}) {
  const [address, setAddress] = useState("");
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isValidEthAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  const handleSubmit = () => {
    if (!isValidEthAddress(address)) {
      setError("Invalid Ethereum address");
      return;
    }
    onSubmit(address, files);
    setAddress("");
    onClose();
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const fileList = e.dataTransfer.files;

    if (fileList !== null) {
      setFiles(Array.from(fileList))
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList !== null) {
      setFiles(Array.from(fileList))
    }
  };

  return (
    <DialogContent className="sm:max-w-md bg-[#1A1F27] text-[#F0F0F0]">
      <DialogHeader>
        <DialogTitle className="text-[#F0F0F0]">Import Ethereum Address</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="eth-address" className="text-[#F0F0F0]">Enter Address</Label>
          <Input
            id="eth-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className="bg-[#2A2F38] text-[#F0F0F0] placeholder-[#A3A3A3] border-[#A3A3A3] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
          />
        </div>
        <ul className="text-[#F0F0F0]">
          {files.map((file, idx) => <li key={file.name + idx}>{file.name}</li>)}
        </ul>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileDrop}
          className={cn(
            "border-2 border-dashed p-4 text-center rounded-md cursor-pointer transition",
            dragOver ? "border-[#00FFC6] bg-[#00FFC650]" : "border-[#A3A3A3] bg-[#2A2F38]"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <p className="text-sm text-[#A3A3A3]">
            Drag & drop CSV file here or click to browse
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <DialogFooter>
        <Button className="bg-[#00FFC6] text-[#1A1F27] hover:bg-[#00e0b3] focus:ring-[#00FFC6]" onClick={handleSubmit}>
          Import Address
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}