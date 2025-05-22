"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import ImportFromEtherscanButton from "@/app/wallets/components/ImportFromEtherscanButton";
import AddWalletButton from "../AddWalletButton";
import { PageContentTitle } from "@/components/PageContentTitle";
import { PageContentHeader } from "@/components/PageContentHeader";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

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
    <PageContentHeader className="flex flex-col space-y-6 bg-[#1A1F27] rounded-lg border border-[#2A2F38] p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-6"
      >
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PageContentTitle text="Wallets" />
            <p className="text-sm text-[#A3A3A3] mt-1">
              Manage and track your Ethereum wallets
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]" />
            <Input
              type="text"
              placeholder="Search by address or name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full md:w-80 bg-[#2A2F38] text-[#F0F0F0] border-[#2A2F38] focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded-lg pl-10"
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <ImportFromEtherscanButton />
          <AddWalletButton />
        </motion.div>
      </motion.div>
    </PageContentHeader>
  );
};

export default WalletsHeader;
