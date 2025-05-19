import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
} from "@/components/ui/dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  title: string;
  isOpen: boolean;
  modalContent: ReactNode;
  footerButtons: ReactNode;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const ModalWrapper: React.FC<Props> = ({
  title,
  isOpen,
  modalContent,
  footerButtons,
  onOpenChange
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F27] border-[#2A2F38] text-[#F0F0F0]">
        <DialogHeader>
          <DialogTitle className="text-[#F0F0F0]">{title}</DialogTitle>
        </DialogHeader>
        {modalContent}
        <DialogFooter>
          {footerButtons}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
