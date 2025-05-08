
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import EthAddressAndFilesModalContent from "../EthAddressAndFilesModal";
import { Dialog } from "@radix-ui/react-dialog";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useState } from "react";

export default function ImportFromCSVButton() {
  const { importFromCsv } = useWalletStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImportClick = () => {
    setIsModalOpen(true);
  };

  const handleAddressSubmit = (address: string, files: File[]) => {
    const data = new FormData();

    data.append('address', address);
    files.forEach(file => {
      data.append('files', file)
    });

    importFromCsv(data);
  };

  return (
    <>
      <Button
        onClick={handleImportClick}
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl cursor-pointer"
      >
        <Upload className="w-4 h-4 mr-2" />
        Import from CSV
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <EthAddressAndFilesModalContent
          onSubmit={handleAddressSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Dialog>
    </>
  );
}