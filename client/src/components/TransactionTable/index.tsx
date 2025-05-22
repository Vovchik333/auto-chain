'use client';

import { TransactionDto } from "@/common/types/transaction/transaction.dto";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLinkIcon, ArrowUpRight, ArrowDownLeft, Search, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  transactions: TransactionDto[];
};

type SortField = 'date' | 'value' | 'status';
type SortOrder = 'asc' | 'desc';
type FilterStatus = 'all' | 'Success' | 'Pending' | 'Failed';

const formatEth = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 8
  }).format(value);
};

const formatUsd = (ethValue: number) => {
  const ethPrice = 2000; // This should come from an API in production
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(ethValue * ethPrice);
};

const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ITEMS_PER_PAGE = 10;

export default function TransactionTable({ transactions }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Apply search filter
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

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortField === 'date') {
        return sortOrder === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortField === 'value') {
        return sortOrder === 'desc' ? b.value - a.value : a.value - b.value;
      }
      if (sortField === 'status') {
        return sortOrder === 'desc'
          ? b.status.localeCompare(a.status)
          : a.status.localeCompare(b.status);
      }
      return 0;
    });
  }, [transactions, searchTerm, sortField, sortOrder, statusFilter]);

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
        className="flex flex-col items-center justify-center p-8 rounded-xl border border-[#2A2F3A] bg-[#1A1F27]"
      >
        <div className="w-16 h-16 rounded-full bg-[#2A2F38] flex items-center justify-center mb-4">
          <ArrowUpRight className="w-8 h-8 text-[#00FFC6] rotate-45" />
        </div>
        <h3 className="text-lg font-medium text-[#F0F0F0] mb-2">No Transactions Yet</h3>
        <p className="text-sm text-[#9CA3AF] text-center">
          Your transactions will appear here once you start making transfers.
        </p>
      </div>
    );
  }

  return (
    <div
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 bg-[#2A2F38] border-[#353B45] text-[#F0F0F0] placeholder-[#9CA3AF] w-full"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-[#2A2F38] border-[#353B45] text-[#F0F0F0] hover:bg-[#353B45]">
                <Filter className="w-4 h-4 mr-2" />
                {statusFilter === 'all' ? 'All Status' : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2A2F38] border-[#353B45] text-[#F0F0F0]">
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Success')}>Success</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Failed')}>Failed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
          <span>{filteredAndSortedTransactions.length} transactions</span>
          {searchTerm && (
            <Badge variant="outline" className="bg-[#2A2F38] text-[#F0F0F0]">
              Search results
            </Badge>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#2A2F3A] bg-[#1A1F27] shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-[#232936] border-b border-[#2A2F3A]">
              <tr className="text-left font-medium text-[#CFCFCF]">
                <th className="px-4 py-3">Transaction</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">To</th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-[#00FFC6] transition-colors"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center gap-1">
                    Value
                    {sortField === 'value' && (
                      sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3">Fee</th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-[#00FFC6] transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortField === 'status' && (
                      sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 cursor-pointer hover:text-[#00FFC6] transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    Date
                    {sortField === 'date' && (
                      sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2F3A]">
                {currentTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="group transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          tx.category === "income" ? "bg-emerald-500/10" : "bg-rose-500/10"
                        }`}>
                          {tx.category === "income" ? (
                            <ArrowDownLeft className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-rose-500" />
                          )}
                        </div>
                        <div>
                          <Link 
                            href={`/transactions/${tx.id}`}
                            className="text-[#00FFC6] hover:underline font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                          >
                            {truncateAddress(tx.hash)}
                            <ExternalLinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <a
                            href={`https://etherscan.io/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#9CA3AF] hover:text-[#00FFC6] transition-colors"
                          >
                            View on Etherscan
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-[#E5E7EB] font-medium">{truncateAddress(tx.from)}</span>
                        <span className="text-xs text-[#9CA3AF]">Sender</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-[#E5E7EB] font-medium">{truncateAddress(tx.to)}</span>
                        <span className="text-xs text-[#9CA3AF]">Recipient</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{formatEth(tx.value)} ETH</span>
                        <span className="text-xs text-[#9CA3AF]">{formatUsd(tx.value)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{formatEth(tx.txnFee)} ETH</span>
                        <span className="text-xs text-[#9CA3AF]">{formatUsd(tx.txnFee)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          tx.status === "Success"
                            ? "default"
                            : tx.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className={`
                          px-3 py-1 rounded-full font-medium
                          ${tx.status === "Success"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : tx.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"}
                        `}
                      >
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-[#E5E7EB] font-medium">
                          {formatDistanceToNow(new Date(tx.date), { addSuffix: true })}
                        </span>
                        <span className="text-xs text-[#9CA3AF]">
                          {new Date(tx.date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={`
                          px-3 py-1 rounded-full font-medium capitalize
                          ${tx.category === "income"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"}
                        `}
                      >
                        {tx.category}
                      </Badge>
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
    </div>
  );
}