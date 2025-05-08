import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import EthAddressModalContent from "../EthAddressModal";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useState } from "react";

export default function ExportToCSVButton() {
  const { exportToCsv } = useWalletStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExportClick = () => {
    setIsModalOpen(true);
  };

  const handleAddressSubmit = (address: string) => {
    exportToCsv({address});
  };

  return (
    <>
      <Button onClick={handleExportClick} className="bg-gray-700 hover:bg-gray-800 text-white rounded-2xl cursor-pointer">
        <Download className="w-4 h-4 mr-2" />
        Export to CSV
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