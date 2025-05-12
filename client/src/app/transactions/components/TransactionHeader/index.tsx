import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuItem,
  DropdownMenuTrigger, 
  DropdownMenuContent 
} from "@/components/ui/dropdown-menu";
import AddTransactionButton from "../AddTransaction";
import ImportFromCSVButton from "../ImportFromCSVButton";
import { PageContentTitle } from "@/components/PageContentTitle";
import { PageContentHeader } from "@/components/PageContentHeader";

const TransactionsHeader = () => {
  return (
    <PageContentHeader className="flex flex-col space-y-4 bg-[#1A1F27]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <PageContentTitle text="Transactions"/>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm text-[#A3A3A3] border border-[#2C2C2C] px-3 py-1.5 rounded-md hover:bg-[#1A1A1A] transition-colors">
              All wallets
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 bg-[#1A1A1A] shadow-lg rounded-md border border-[#2C2C2C]">
              <DropdownMenuItem className="text-sm text-white hover:bg-[#00FFC6] hover:text-black">Wallet 1</DropdownMenuItem>
              <DropdownMenuItem className="text-sm text-white hover:bg-[#00FFC6] hover:text-black">Wallet 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col gap-4">
          <ImportFromCSVButton />
          <AddTransactionButton />
        </div>
      </div>
    </PageContentHeader>
  );
};

export default TransactionsHeader;
