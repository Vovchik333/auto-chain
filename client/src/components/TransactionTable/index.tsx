'use client';

import { TransactionDto } from "@/common/types/transaction/transaction.dto";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLinkIcon, ArrowUpRight, Search, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ExportToCSVButton from "./components/ExportToCSVButton";
import { formatStringNumber } from "@/lib/string.utils";
import { ActionsMenu } from "@/components/ActionsMenu";
import { useTransactionStore } from "@/stores/transaction/transaction.store";
import UpdateTransactionModal from "@/app/transactions/components/UpdateTransactionModal";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { WalletDto } from "@/common/types/wallet/wallet.dto";

type Props = {
  transactions: TransactionDto[];
  walletId?: string;
};

type SortField = 'date' | 'value' | 'status';
type SortOrder = 'asc' | 'desc';
type FilterStatus = 'all' | 'Success' | 'Pending' | 'Failed';
type FilterType = 'all' | 'deposit' | 'withdraw';
type FilterCategory = string;

const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const hasAddress = (wallet: WalletDto): wallet is WalletDto & { address: string } => {
  return typeof wallet.address === 'string' && wallet.address.length > 0;
};

type TranslationFunction = {
  (key: string): string | undefined;
  (key: string, params: Record<string, any>): string | undefined;
};

const getWalletDisplayName = (walletId: string, wallets: WalletDto[], t: TranslationFunction): string => {
  const wallet = wallets.find(w => w.id === walletId);
  if (!wallet) return walletId;
  const displayName = wallet.name || t('preview.defaultName', { id: wallet.id }) || walletId;
  return displayName;
};

const ITEMS_PER_PAGE = 10;

export default function TransactionTable({ transactions, walletId }: Props) {
  const t = useTranslations('transaction') as TranslationFunction;
  const walletT = useTranslations('wallet') as TranslationFunction;
  const { wallets } = useWalletStore();
  const { updateTx, deleteTx } = useTransactionStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [walletFilter, setWalletFilter] = useState<string>(walletId || 'all');
  const [selectedTx, setSelectedTx] = useState<TransactionDto | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Get unique categories from transactions
  const categories = useMemo(() => {
    const uniqueCategories = new Set(transactions.map(tx => tx.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, [transactions]);

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tx =>
        tx.hash.toLowerCase().includes(term) ||
        tx.from.toLowerCase().includes(term) ||
        tx.to.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(tx => tx.type === typeFilter);
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(tx => tx.category === categoryFilter);
    }

    // Apply wallet filter
    if (walletFilter !== 'all') {
      filtered = filtered.filter(tx => tx.walletId === walletFilter);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortField === 'date') {
        return sortOrder === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortField === 'value') {
        return sortOrder === 'desc' ? Number(b.value) - Number(a.value) : Number(a.value) - Number(b.value);
      }
      if (sortField === 'status') {
        return sortOrder === 'desc'
          ? b.status.localeCompare(a.status)
          : a.status.localeCompare(b.status);
      }
      return 0;
    });
  }, [transactions, searchTerm, sortField, sortOrder, statusFilter, typeFilter, categoryFilter, walletFilter]);

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / ITEMS_PER_PAGE);
  const currentTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  if (!transactions.length) {
    return (
      <div
        className="flex flex-col items-center justify-center p-8 rounded-box-lg border border-border bg-background theme-transition"
      >
        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4 theme-transition">
          <ArrowUpRight className="w-8 h-8 text-primary rotate-45 theme-transition" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2 theme-transition">{t('noTransactions')}</h3>
        <p className="text-sm text-muted-foreground text-center theme-transition">
          {t('noTransactionsDescription')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground theme-transition" />
            <Input
              placeholder={t('searchTransactions')}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 bg-secondary/50 border-border text-foreground placeholder-muted-foreground w-full theme-transition"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-secondary/50 border-border text-foreground hover:bg-secondary theme-transition">
                <Filter className="w-4 h-4 mr-2" />
                {t('filters')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-secondary/50 border-border text-foreground theme-transition w-56">
              <div className="p-2 border-b border-border">
                <p className="text-sm font-medium mb-2">{t('filterByStatus')}</p>
                <div className="space-y-1">
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>{t('all')}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Success')}>{t('completed')}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>{t('pending')}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Failed')}>{t('failed')}</DropdownMenuItem>
                </div>
              </div>
              <div className="p-2 border-b border-border">
                <p className="text-sm font-medium mb-2">{t('filterByType')}</p>
                <div className="space-y-1">
                  <DropdownMenuItem onClick={() => setTypeFilter('all')}>{t('all')}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('deposit')}>{t('deposit')}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('withdraw')}>{t('withdraw')}</DropdownMenuItem>
                </div>
              </div>
              <div className="p-2 border-b border-border">
                <p className="text-sm font-medium mb-2">{t('filterByCategory')}</p>
                <div className="space-y-1">
                  <DropdownMenuItem onClick={() => setCategoryFilter('all')}>{t('all')}</DropdownMenuItem>
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                      {category}
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
              {!walletId && (
                <div className="p-2">
                  <p className="text-sm font-medium mb-2">{t('filterByWallet')}</p>
                  <div className="space-y-1">
                    <DropdownMenuItem onClick={() => setWalletFilter('all')}>{t('allWallets')}</DropdownMenuItem>
                    {wallets.filter(hasAddress).map(wallet => (
                      <DropdownMenuItem key={wallet.id} onClick={() => setWalletFilter(wallet.id)}>
                        {wallet.name || walletT('preview.defaultName', { id: wallet.id }) || wallet.id}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground theme-transition">
            <ExportToCSVButton walletId={walletId || ''} />
            {searchTerm && (
              <Badge variant="outline" className="bg-secondary/50 text-foreground theme-transition">
                {t('searchResults')}
              </Badge>
            )}
            {statusFilter !== 'all' && (
              <Badge variant="outline" className="bg-secondary/50 text-foreground theme-transition">
                {t(statusFilter.toLowerCase())}
              </Badge>
            )}
            {typeFilter !== 'all' && (
              <Badge variant="outline" className="bg-secondary/50 text-foreground theme-transition">
                {t(typeFilter)}
              </Badge>
            )}
            {categoryFilter !== 'all' && (
              <Badge variant="outline" className="bg-secondary/50 text-foreground theme-transition">
                {categoryFilter}
              </Badge>
            )}
            {walletFilter !== 'all' && !walletId && (
              <Badge variant="outline" className="bg-secondary/50 text-foreground theme-transition">
                {getWalletDisplayName(walletFilter, wallets, t)}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-box-lg border border-border bg-background shadow-sm theme-transition">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-secondary/50 border-b border-border theme-transition">
              <tr className="text-left font-medium text-foreground theme-transition">
                <th className="px-4 py-3">{t('transaction')}</th>
                <th className="px-4 py-3">{t('from')}</th>
                <th className="px-4 py-3">{t('to')}</th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-primary transition-colors theme-transition"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center gap-1">
                    {t('amount')}
                    {sortField === 'value' && (
                      sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3">{t('fee')}</th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-primary transition-colors theme-transition"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    {t('status')}
                    {sortField === 'status' && (
                      sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-primary transition-colors theme-transition"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    {t('date')}
                    {sortField === 'date' && (
                      sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3">{t('type')}</th>
                <th className="px-4 py-3">{t('category')}</th>
                <th className="px-4 py-3">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="group transition-colors hover:bg-secondary/50 theme-transition"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div>
                        <Link 
                          href={`/transactions/${tx.id}`}
                          className="text-primary hover:underline font-medium flex items-center gap-1 group-hover:gap-2 transition-all theme-transition"
                        >
                          {truncateAddress(tx.hash)}
                          <ExternalLinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium theme-transition">{truncateAddress(tx.from)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium theme-transition">{truncateAddress(tx.to)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium theme-transition">{formatStringNumber(tx.value)} ETH</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium theme-transition">{formatStringNumber(tx.txnFee)} ETH</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        tx.status === 'Success' ? 'default' :
                        tx.status === 'Failed' ? 'destructive' :
                        'secondary'
                      }
                      className="theme-transition"
                    >
                      {t(tx.status.toLowerCase())}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground theme-transition">
                    {formatDistanceToNow(new Date(tx.date), { addSuffix: true })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="bg-secondary/50 text-foreground theme-transition">
                      {t(tx.type)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="bg-secondary/50 text-foreground theme-transition">
                      {tx.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <ActionsMenu
                      onEdit={() => {
                        setSelectedTx(tx);
                        setIsUpdateModalOpen(true);
                      }}
                      onDelete={() => {
                        if (window.confirm(t('confirmDelete'))) {
                          deleteTx(tx.id);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-[#9CA3AF]">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedTransactions.length)} of {filteredAndSortedTransactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="bg-[#2A2F38] border-[#353B45] text-[#F0F0F0] hover:bg-[#353B45] disabled:opacity-50"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  className={`w-8 h-8 p-0 ${
                    page === currentPage
                      ? "bg-[#00FFC6] text-[#1A1F27]"
                      : "bg-[#2A2F38] border-[#353B45] text-[#F0F0F0] hover:bg-[#353B45]"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              className="bg-[#2A2F38] border-[#353B45] text-[#F0F0F0] hover:bg-[#353B45] disabled:opacity-50"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      {selectedTx && isUpdateModalOpen && (
        <UpdateTransactionModal
          transaction={selectedTx}
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setSelectedTx(null);
            setIsUpdateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}