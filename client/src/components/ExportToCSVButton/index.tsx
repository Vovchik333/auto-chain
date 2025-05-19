import { Download } from "lucide-react";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import { useUserStore } from "@/stores/user/user.store";
import { SecondaryButton } from "@/components/SecondaryButton";
import { Button } from "../ui/button";
import { PrimaryButton } from "../PrimaryButton";

type Props = {
  address: string;
}

export default function ExportToCSVButton({ address }: Props) {
  const { user } = useUserStore();
  const { exportToCsv } = useTransactionStore();

  const handleAddressSubmit = () => {
    if (user === null) {
      return;
    }
    const { id: userId } = user;
    exportToCsv({address, userId});
  };

  return (
    <SecondaryButton onClick={handleAddressSubmit}>
      <Download className="w-4 h-4 mr-2" />
      Export to CSV
    </SecondaryButton>
  );
}