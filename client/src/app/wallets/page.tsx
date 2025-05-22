'use client'

import { withPrivateRoute } from "@/hoc/with-private-route.hoc";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import WalletsHeader from "./components/WalletsHeader";
import { useUserStore } from "@/stores/user/user.store";
import { useEffect, useState } from "react";
import WalletPreview from "./components/WalletPreview";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Plus } from "lucide-react";

function Wallets() {
  const { user } = useUserStore()
  const { wallets, loadWallets, isLoading } = useWalletStore();
  const [filteredWallets, setFilteredWallets] = useState(wallets);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredWallets(wallets);
    } else {
      setFilteredWallets(
        wallets.filter((wallet) =>
          wallet.address.toLowerCase().includes(query.toLowerCase()) ||
          (wallet.name && wallet.name.toLowerCase().includes(query.toLowerCase()))
        )
      );
    }
  };

  useEffect(() => {
    if (user === null) return;
    const { id: userId } = user;
    loadWallets({ userId });
  }, [user]);

  useEffect(() => {
    setFilteredWallets(wallets);
  }, [wallets]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#1A1F27] p-6"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <WalletsHeader onSearch={handleSearch} />
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <div className="flex items-center gap-2 text-[#00FFC6]">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Loading wallets...</span>
              </div>
            </motion.div>
          ) : filteredWallets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              {searchQuery ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-[#2A2F38] flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-[#00FFC6]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#F0F0F0] mb-2">No wallets found</h3>
                  <p className="text-[#A3A3A3] max-w-sm">
                    No wallets match your search criteria. Try a different search term.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-[#2A2F38] flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-[#00FFC6]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#F0F0F0] mb-2">No wallets yet</h3>
                  <p className="text-[#A3A3A3] max-w-sm">
                    Get started by adding your first wallet or importing from Etherscan
                  </p>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2"
            >
              {filteredWallets.map((wallet, index) => (
                <motion.div
                  key={wallet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                >
                  <WalletPreview wallet={wallet} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default withPrivateRoute(Wallets);
