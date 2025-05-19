import { Upload } from "lucide-react";
import EthAddressAndFilesModalContent from "../../../../components/EthAddressAndFilesModal";
import { useState } from "react";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";
import { PrimaryButton } from "@/components/PrimaryButton";
import { CreateTxsDto } from "@/common/types/transaction/create-txs.dto";

export default function ImportFromCSVButton() {
  const { user } = useUserStore(); 
  const { importFromCsv } = useTransactionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImportClick = () => {
    setIsModalOpen(true);
  };

  const handleAddressSubmit = ({walletId, files}: Omit<CreateTxsDto, 'userId'>) => {
    if (user === null) {
      return;
    }

    const data = new FormData();

    data.append('walletId', walletId);
    data.append('userId', user.id);
    files.forEach(file => {
      data.append('files', file)
    });

    importFromCsv(data);
    setIsModalOpen(false);
  };

  return (
    <>
      <PrimaryButton onClick={handleImportClick}>
        <Upload className="w-4 h-4 mr-2" />
        Import from CSV
      </PrimaryButton>
      <EthAddressAndFilesModalContent
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleAddressSubmit}
      />
    </>
  );
}