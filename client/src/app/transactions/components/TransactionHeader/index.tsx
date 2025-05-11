import { 
  DropdownMenu, 
  DropdownMenuItem,
  DropdownMenuTrigger, 
  DropdownMenuContent 
} from "@/components/ui/dropdown-menu"

const TransactionsHeader = () => {
  return (
    <div className="flex flex-col space-y-4 bg-white pb-4 border-b">
      {/* Заголовок */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Transactions</h1>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-full">Add transaction</button>
      </div>

      {/* Фільтри */}
      <div className="flex space-x-4">
        {/* All wallets dropdown */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm text-gray-700">
              All wallets
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 bg-white shadow-lg rounded-md">
              <DropdownMenuItem className="text-sm">Wallet 1</DropdownMenuItem>
              <DropdownMenuItem className="text-sm">Wallet 2</DropdownMenuItem>
              {/* Додайте більше опцій */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* All currencies dropdown */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm text-gray-700">
              All currencies
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 bg-white shadow-lg rounded-md">
              <DropdownMenuItem className="text-sm">USD</DropdownMenuItem>
              <DropdownMenuItem className="text-sm">EUR</DropdownMenuItem>
              {/* Додайте більше опцій */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Додаткові дії */}
      <div className="flex justify-between items-center">
        {/* Кнопки фільтрів */}
        <div className="space-x-2">
          <button className="text-sm text-blue-500">Type</button>
          <button className="text-sm text-blue-500">Tag</button>
          <button className="text-sm text-blue-500">Manual</button>
          <button className="text-sm text-blue-500">Warnings</button>
          <button className="text-sm text-blue-500">Dates</button>
        </div>

        {/* Сортування */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm text-gray-700">
              Sort by Most recent
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 bg-white shadow-lg rounded-md">
              <DropdownMenuItem className="text-sm">Most recent</DropdownMenuItem>
              <DropdownMenuItem className="text-sm">Oldest</DropdownMenuItem>
              {/* Додайте інші варіанти сортування */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button className="text-sm text-blue-500">+ Add Filter</button>
      </div>
    </div>
  );
};

export default TransactionsHeader;
