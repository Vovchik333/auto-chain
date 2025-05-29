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
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { ChevronDown, Wallet } from "lucide-react";
import { useTranslations } from 'next-intl';

const TransactionsHeader = () => {
  const t = useTranslations('transaction');
  const { wallets } = useWalletStore();

  return (
    <PageContentHeader className="flex flex-col space-y-6 bg-[#1A1F27] rounded-lg border border-[#2A2F38] p-6">
      <div 
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-6"
      >
        <div className="flex flex-col gap-4">
          <div>
            <PageContentTitle text={t('pageTitle')}/>
            <p className="text-sm text-[#A3A3A3] mt-1">
              {t('pageDescription')}
            </p>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-[#F0F0F0] bg-[#2A2F38] px-4 py-2 rounded-lg hover:bg-[#353B45] transition-colors">
                <Wallet className="w-4 h-4 text-[#00FFC6]" />
                <span>{t('allWallets')}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 bg-[#2A2F38] shadow-xl rounded-lg border border-[#353B45]">
                <DropdownMenuItem className="text-sm text-[#F0F0F0] hover:bg-[#00FFC6] hover:text-[#1A1F27] rounded-md transition-colors">
                  {t('allWallets')}
                </DropdownMenuItem>
                {wallets.map((wallet) => (
                  <DropdownMenuItem 
                    key={wallet.id}
                    className="text-sm text-[#F0F0F0] hover:bg-[#00FFC6] hover:text-[#1A1F27] rounded-md transition-colors"
                  >
                    {wallet.name || wallet.address.slice(0, 8)}...
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div 
          className="flex flex-col sm:flex-row gap-3"
        >
          <ImportFromCSVButton />
          <AddTransactionButton />
        </div>
      </div>
    </PageContentHeader>
  );
};

export default TransactionsHeader;
