import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { WalletDto } from "@/common/types/wallet/wallet.dto";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionsMenu: React.FC<Props> = ({
  onEdit,
  onDelete,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-[#2C3440] rounded-full p-2 transition-colors cursor-pointer"
        onClick={(e) => e.stopPropagation()} 
      >
        <MoreVertical className="h-5 w-5 text-[#A3A3A3] hover:text-[#00FFC6] transition-colors" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      className="w-44 bg-[#1A1F27] border border-[#2A2F38] text-[#F0F0F0] shadow-xl rounded-2xl p-3"
      align="end"
      onClick={(e) => e.stopPropagation()}
    >
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="text-sm rounded-xl px-3 py-2 transition-colors cursor-pointer flex items-center gap-2 !bg-transparent hover:!bg-[#00ffc615] !text-[#F0F0F0] hover:!text-[#00FFC6]"
      >
        <Pencil className="w-4 h-4 text-[#00FFC6]" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="text-sm rounded-xl px-3 py-2 transition-colors cursor-pointer flex items-center gap-2 !bg-transparent hover:!bg-red-500/10 !text-red-400"
      >
        <Trash2 className="w-4 h-4 text-red-400 " />
        Remove
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
