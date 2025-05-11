import { MoreVertical, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  name: string;
}

export default function WalletHeader({ name }: Props) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <Link href="/wallets">
          <ArrowLeft className="h-5 w-5 text-[#A3A3A3] hover:text-[#00FFC6] transition-colors" />
        </Link>
        <div>
          <div className="text-lg font-semibold text-[#F0F0F0]">{name}</div>
        </div>
      </div>
      <MoreVertical className="h-5 w-5 text-[#A3A3A3] hover:text-[#00FFC6] cursor-pointer transition-colors" />
    </div>
  );
}
