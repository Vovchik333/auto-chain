import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { WalletDto } from "@/common/types/wallet/wallet.dto";
import { useTranslations } from 'next-intl';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionsMenu: React.FC<Props> = ({
  onEdit,
  onDelete,
}) => {
  const t = useTranslations('actions');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-secondary rounded-full p-2 transition-colors cursor-pointer theme-transition"
          onClick={(e) => e.stopPropagation()} 
        >
          <MoreVertical className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors theme-transition" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-44 bg-background border border-border text-foreground shadow-xl rounded-2xl p-3 theme-transition"
        align="end"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-sm rounded-xl px-3 py-2 transition-colors cursor-pointer flex items-center gap-2 !bg-transparent hover:!bg-primary/10 !text-foreground hover:!text-primary theme-transition"
        >
          <Pencil className="w-4 h-4 text-primary theme-transition" />
          {t('edit')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-sm rounded-xl px-3 py-2 transition-colors cursor-pointer flex items-center gap-2 !bg-transparent hover:!bg-destructive/10 !text-destructive theme-transition"
        >
          <Trash2 className="w-4 h-4 text-destructive theme-transition" />
          {t('remove')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
