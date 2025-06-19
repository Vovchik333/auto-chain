import { WalletDto } from "@/common/types/wallet/wallet.dto";
import { PageContentTitle } from "@/components/PageContentTitle";
import { MoreVertical, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

interface Props {
  wallet: WalletDto;
}

export default function WalletHeader({ wallet }: Props) {
  const t = useTranslations('wallet');

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <Link href="/wallets">
          <ArrowLeft className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors theme-transition" />
        </Link>
        <PageContentTitle text={wallet.name || t('preview.defaultName', { id: wallet.id })} />
        <span className="text-muted-foreground theme-transition">({wallet.address})</span>
      </div>
      <MoreVertical className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors theme-transition" />
    </div>
  );
}
