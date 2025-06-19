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
