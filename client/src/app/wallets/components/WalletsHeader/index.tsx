"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import ImportFromEtherscanButton from "@/app/wallets/components/ImportFromEtherscanButton";
import AddWalletButton from "../AddWalletButton";
import { PageContentTitle } from "@/components/PageContentTitle";
import { PageContentHeader } from "@/components/PageContentHeader";
import { Search } from "lucide-react";
import { useTranslations } from 'next-intl';

type Props = {
  onSearch: (query: string) => void
}

const WalletsHeader: React.FC<Props> = ({
  onSearch
}) => {
  const t = useTranslations('wallet');
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <PageContentHeader className="flex flex-col space-y-6 bg-background rounded-lg border border-border p-6 theme-transition">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <PageContentTitle text={t('header.title')} />
            <p className="text-sm text-muted-foreground mt-1 theme-transition">
              {t('header.description')}
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground theme-transition" />
            <Input
              type="text"
              placeholder={t('header.search')}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full md:w-80 bg-secondary text-foreground border-border focus:ring-primary focus:border-primary rounded-lg pl-10 theme-transition"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <ImportFromEtherscanButton />
          <AddWalletButton />
        </div>
      </div>
    </PageContentHeader>
  );
};

export default WalletsHeader;
