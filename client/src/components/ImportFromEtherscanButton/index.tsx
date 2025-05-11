import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import EthAddressModalContent from "../EthAddressModal";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useUserStore } from "@/stores/user/user.store";
import { useTransactionStore } from "@/stores/transaction/transaction.store";

export default function ImportFromEtherscanButton() {
  const { importFromEtherscan } = useWalletStore();
  const { user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImportClick = () => {
    setIsModalOpen(true);
  };

  const handleAddressSubmit = async (address: string) => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;
    importFromEtherscan({address, userId});
  };

  return (
    <>
      <Button onClick={handleImportClick} className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
        <UploadCloud className="w-4 h-4 mr-2" />
        Import from Etherscan
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <EthAddressModalContent
          onSubmit={handleAddressSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Dialog>
    </>
  );
}