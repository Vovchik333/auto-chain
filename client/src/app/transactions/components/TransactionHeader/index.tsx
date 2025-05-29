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
    <PageContentHeader className="flex flex-col space-y-6 bg-background rounded-box-lg border border-border p-6 theme-transition">
      <div 
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-6"
      >
        <div className="flex flex-col gap-4">
          <div>
            <PageContentTitle text={t('pageTitle')}/>
            <p className="text-sm text-muted-foreground mt-1 theme-transition">
              {t('pageDescription')}
            </p>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-foreground bg-secondary/50 px-4 py-2 rounded-box-lg hover:bg-secondary transition-colors theme-transition">
                <Wallet className="w-4 h-4 text-primary theme-transition" />
                <span>{t('allWallets')}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2 bg-background shadow-xl rounded-box-lg border border-border theme-transition">
                <DropdownMenuItem className="text-sm text-foreground hover:bg-primary hover:text-background rounded-md transition-colors theme-transition">
                  {t('allWallets')}
                </DropdownMenuItem>
                {wallets.map((wallet) => (
                  <DropdownMenuItem 
                    key={wallet.id}
                    className="text-sm text-foreground hover:bg-primary hover:text-background rounded-md transition-colors theme-transition"
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
