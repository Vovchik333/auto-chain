import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog } from "../../../../components/ui/dialog";
import EthAddressModalContent from "../../../../components/EthAddressModal";
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
      <Button 
        onClick={handleImportClick} 
        className="bg-[#00FFC6] hover:bg-[#00e6b2] text-[#1A1F27] font-medium cursor-pointer transition-colors"
      >
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