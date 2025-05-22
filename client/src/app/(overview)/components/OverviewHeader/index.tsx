import { PageContentHeader } from "@/components/PageContentHeader";
import { PageContentTitle } from "@/components/PageContentTitle";
import { useWalletStore } from "@/stores/wallet/wallet.store";

export const OverviewHeader = () => {
  const { wallets } = useWalletStore();
  
  return (
    <PageContentHeader className="flex flex-col space-y-6 bg-[#1A1F27] rounded-lg border border-[#2A2F38] p-6">
      <div 
        className="space-y-6"
      >
        <div>
            <PageContentTitle text="Overview" />
            <p className="text-sm text-[#A3A3A3] mt-1">
              Track your portfolio performance and activity
            </p>
          </div>
      </div>
    </PageContentHeader>
  );
}