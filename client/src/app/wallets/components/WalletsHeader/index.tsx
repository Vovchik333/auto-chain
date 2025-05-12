"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import ImportFromEtherscanButton from "@/app/wallets/components/ImportFromEtherscanButton";
import AddWalletButton from "../AddWalletButton";
import { PageContentTitle } from "@/components/PageContentTitle";
import { PageContentHeader } from "@/components/PageContentHeader";

type Props = {
  onSearch: (query: string) => void
}

const WalletsHeader: React.FC<Props> = ({
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <PageContentHeader className="flex justify-between bg-[#1A1F27]">
      <div className="flex gap-4 flex-col">
        <PageContentTitle text="Wallets" />
        <Input
          type="text"
          placeholder="Find wallet..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-64 bg-[#2A2F38] text-[#F0F0F0] border-none focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
        />
      </div>
      <div className="flex gap-4 flex-col">
        <ImportFromEtherscanButton />
        <AddWalletButton />
      </div>
    </PageContentHeader>
  );
};

export default WalletsHeader;
