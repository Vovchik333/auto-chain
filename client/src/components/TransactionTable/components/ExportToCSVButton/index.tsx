import { Download } from "lucide-react";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";
import { SecondaryButton } from "@/components/SecondaryButton";

type Props = {
  walletId: string;
}

export default function ExportToCSVButton({ walletId }: Props) {
  const { user } = useUserStore();
  const { exportToCsv } = useTransactionStore();

  const handleAddressSubmit = () => {
    if (user === null) {
      return;
    }
    const { id: userId } = user;
    exportToCsv({walletId, userId});
  };

  return (
    <SecondaryButton onClick={handleAddressSubmit}>
      <Download className="w-4 h-4 mr-2" />
      Export to CSV
    </SecondaryButton>
  );
}