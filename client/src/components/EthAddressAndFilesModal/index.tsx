import { useState, Dispatch, SetStateAction } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { PrimaryButton } from "../PrimaryButton";
import { WalletList } from "@/app/transactions/components/WalletList";
import { DropZone } from "../DropZone";
import { CreateTxsDto } from "@/common/types/transaction/create-txs.dto";
import { FilesList } from "../FilesList";
import { useUserStore } from "@/stores/user/user.store";

type Props = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSubmit: ({walletId, files}: Omit<CreateTxsDto, 'userId'>) => void;
}

export default function EthAddressAndFilesModalContent({
  isOpen,
  onOpenChange,
  onSubmit
}: Props) {
  const { user } = useUserStore();
  const [payload, setPayload] = useState<Omit<CreateTxsDto, 'userId'>>({
    files: [],
    walletId: ''
  })

  const handleSetWalletId = (walletId: string) => {
    setPayload(prev => ({...prev, walletId}));
  }

  const handleSetFiles = (files: File[]) => {
    setPayload(prev => ({...prev, files}));
  }

  const handleSubmit = () => {
    if (!user) {
      return;
    }

    onSubmit(payload);
    setPayload({
      files: [],
      walletId: ''
    });
  };

  return (
    <ModalWrapper 
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Import Ethereum Address"
      modalContent={
        <div className="grid gap-4 py-2">
          <WalletList onSetWalletId={handleSetWalletId} walletId={payload.walletId} />
          <FilesList files={payload.files} />
          <DropZone onSetFiles={handleSetFiles}/>
        </div>
      }
      footerButtons={
        <PrimaryButton onClick={handleSubmit}>
          Import
        </PrimaryButton>
      }
    />
  );
}