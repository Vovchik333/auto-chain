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
      <DialogContent className="rounded-md bg-background/95 backdrop-blur-sm border-border shadow-lg theme-transition">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground theme-transition">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {modalContent}
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          {footerButtons}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
