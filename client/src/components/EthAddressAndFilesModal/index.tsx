import { useState, Dispatch, SetStateAction } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { PrimaryButton } from "../PrimaryButton";
import { WalletList } from "@/app/transactions/components/WalletList";
import { DropZone } from "../DropZone";
import { CreateTxsDto } from "@/common/types/transaction/create-txs.dto";
import { FilesList } from "../FilesList";
import { useUserStore } from "@/stores/user/user.store";
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('importModal');
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
      title={t('title')}
      modalContent={
        <div className="space-y-6 py-2">
          <div className="space-y-4">
            <WalletList onSetWalletId={handleSetWalletId} walletId={payload.walletId} />
            <FilesList files={payload.files} />
            <DropZone onSetFiles={handleSetFiles}/>
          </div>
        </div>
      }
      footerButtons={
        <PrimaryButton 
          onClick={handleSubmit}
          disabled={!payload.walletId || payload.files.length === 0}
        >
          {t('import')}
        </PrimaryButton>
      }
    />
  );
}