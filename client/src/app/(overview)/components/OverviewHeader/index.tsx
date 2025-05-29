import { PageContentHeader } from "@/components/PageContentHeader";
import { PageContentTitle } from "@/components/PageContentTitle";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useTranslations } from 'next-intl';

export const OverviewHeader = () => {
  const { wallets } = useWalletStore();
  const t = useTranslations('overview');
  
  return (
    <PageContentHeader className="flex flex-col space-y-6 bg-background rounded-lg border border-border p-6 theme-transition">
      <div 
        className="space-y-6"
      >
        <div>
            <PageContentTitle text={t('welcome')} />
            <p className="text-sm text-muted-foreground mt-1 theme-transition">
              {t('description')}
            </p>
          </div>
      </div>
    </PageContentHeader>
  );
};