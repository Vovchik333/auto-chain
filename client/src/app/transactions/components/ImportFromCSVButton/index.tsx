import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import EthAddressAndFilesModalContent from "../../../../components/EthAddressAndFilesModal";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";

export default function ImportFromCSVButton() {
  const { user } = useUserStore(); 
  const { importFromCsv } = useTransactionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImportClick = () => {
    setIsModalOpen(true);
  };

  const handleAddressSubmit = (address: string, files: File[]) => {
    if (user === null) {
      return;
    }

    const data = new FormData();

    data.append('address', address);
    data.append('userId', user.id);
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
        className="bg-[#00FFC6] hover:bg-[#00e0b3] text-[#1A1F27] rounded-2xl cursor-pointer flex items-center"
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