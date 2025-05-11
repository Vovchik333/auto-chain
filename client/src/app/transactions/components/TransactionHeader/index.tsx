import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuItem,
  DropdownMenuTrigger, 
  DropdownMenuContent 
} from "@/components/ui/dropdown-menu";
import AddTransactionButton from "../AddTransaction";
import ImportFromCSVButton from "../ImportFromCSVButton";


const TransactionsHeader = () => {
  return (
    <div className="flex flex-col space-y-4 bg-[#1A1F27] pb-4 border-b border-[#2C2C2E]">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">Transactions</h1>
        <AddTransactionButton />
      </div>

      <div className="flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm text-[#A3A3A3] border border-[#2C2C2C] px-3 py-1.5 rounded-md hover:bg-[#1A1A1A] transition-colors">
            All wallets
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2 bg-[#1A1A1A] shadow-lg rounded-md border border-[#2C2C2C]">
            <DropdownMenuItem className="text-sm text-white hover:bg-[#00FFC6] hover:text-black">Wallet 1</DropdownMenuItem>
            <DropdownMenuItem className="text-sm text-white hover:bg-[#00FFC6] hover:text-black">Wallet 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ImportFromCSVButton />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {["Type", "Tag", "Manual", "Warnings", "Dates"].map((filter) => (
            <button
              key={filter}
              className="text-sm text-[#00FFC6] hover:underline"
            >
              {filter}
            </button>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm text-[#A3A3A3] border border-[#2C2C2C] px-3 py-1.5 rounded-md hover:bg-[#1A1A1A] transition-colors">
            Sort by Most recent
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2 bg-[#1A1A1A] shadow-lg rounded-md border border-[#2C2C2C]">
            <DropdownMenuItem className="text-sm text-white hover:bg-[#00FFC6] hover:text-black">Most recent</DropdownMenuItem>
            <DropdownMenuItem className="text-sm text-white hover:bg-[#00FFC6] hover:text-black">Oldest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <button className="text-sm text-[#00FFC6] hover:underline">+ Add Filter</button>
      </div>
    </div>
  );
};

export default TransactionsHeader;
