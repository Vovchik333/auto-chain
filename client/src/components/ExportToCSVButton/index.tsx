import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Dialog } from "@radix-ui/react-dialog";
// import EthAddressModalContent from "../EthAddressModal";
// import { useState } from "react";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";

type Props = {
  address: string;
}

export default function ExportToCSVButton({ address }: Props) {
  const { user } = useUserStore();
  const { exportToCsv } = useTransactionStore();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleExportClick = () => {
  //   setIsModalOpen(true);
  // };

  const handleAddressSubmit = () => {
    if (user === null) {
      return;
    }
    const { id: userId } = user;
    exportToCsv({address, userId});
  };

  return (
    <>
      <Button onClick={handleAddressSubmit} className="bg-gray-700 hover:bg-gray-800 text-white rounded-2xl cursor-pointer">
        <Download className="w-4 h-4 mr-2" />
        Export to CSV
      </Button>
      {/* <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <EthAddressModalContent
          onSubmit={handleAddressSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Dialog> */}
    </>
  );
}