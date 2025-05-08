'use client'

import ExportToCSVButton from "@/components/ExportToCSVButton";
import ImportFromCSVButton from "@/components/ImportFromCSVButton";
import ImportFromEtherscanButton from "@/components/ImportFromEtherscanButton";
import TransactionTable from "@/components/TransactionTable";
import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { useEffect } from "react";

function Home() {
  const { transactions, loadTransactions } = useWalletStore();

  useEffect(() => {
    loadTransactions('0x187238c3E3d5c39e3a16b7299e19198004C94340')
  }, []);

  return (
    <>
      <h1 className="text-xl font-semibold">
        Home
      </h1>
      <div className="flex justify-end gap-4 py-4">
        <ImportFromCSVButton />
        <ImportFromEtherscanButton onClick={() => console.log("Import Etherscan")} />
        <ExportToCSVButton />
      </div>
      <div className="space-y-6 py-4">
        <h2 className="text-xl font-semibold">All Transactions</h2>
        <TransactionTable transactions={transactions} />
      </div>
    </>
  );
}

export default withPrivateRoute(Home);
