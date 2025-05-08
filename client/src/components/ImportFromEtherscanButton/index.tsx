import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import EthAddressModalContent from "../EthAddressModal";
import { useWalletStore } from "@/stores/wallet/wallet.store";

export default function ImportFromEtherscanButton({ onClick }: { onClick?: () => void }) {
  const { importFromEtherscan } = useWalletStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImportClick = () => {
    setIsModalOpen(true);
  };

  const handleAddressSubmit = (address: string) => {
    importFromEtherscan({address});
  };

  return (
    <>
      <Button onClick={handleImportClick} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl cursor-pointer">
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