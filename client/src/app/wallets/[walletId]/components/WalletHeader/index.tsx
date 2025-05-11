import { MoreVertical, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  name: string;
}

export default function WalletHeader({ name }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-3">
        <Link href="/wallets">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <div className="text-lg font-semibold">{name}</div>
        </div>
      </div>
      <MoreVertical className="h-5 w-5 text-gray-500" />
    </div>
  );
}