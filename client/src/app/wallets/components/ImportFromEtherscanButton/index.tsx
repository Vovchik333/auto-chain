import { UploadCloud } from "lucide-react";
import { useState } from "react";
import EthAddressModalContent from "@/components/EthAddressModal";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useUserStore } from "@/stores/user/user.store";
import { PrimaryButton } from "@/components/PrimaryButton";
import { CreateWalletFromBlockchainDto } from "@/common/types/wallet/create-wallet-from-blockchain.dto";

export default function ImportFromEtherscanButton() {
  const { importFromEtherscan } = useWalletStore();
  const { user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddressSubmit = async (payload: Omit<CreateWalletFromBlockchainDto, 'userId'>) => {
    if (user === null) {
      return;
    }

    const { id: userId } = user;
    importFromEtherscan({...payload, userId});
    setIsModalOpen(false)
  };

  return (
    <>
      <PrimaryButton onClick={() => setIsModalOpen(true)}>
        <UploadCloud className="w-4 h-4 mr-2" />
        Import From Blockchain
      </PrimaryButton>
      <EthAddressModalContent
        onOpenChange={setIsModalOpen}
        isOpen={isModalOpen}
        onSubmit={handleAddressSubmit}
      />
    </>
  );
}