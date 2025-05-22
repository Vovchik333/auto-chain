import { PageContentHeader } from "@/components/PageContentHeader";
import { PageContentTitle } from "@/components/PageContentTitle";
import { motion } from "framer-motion";
import { useWalletStore } from "@/stores/wallet/wallet.store";
import { Wallet, TrendingUp, Activity, DollarSign, Clock } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

export const OverviewHeader = () => {
  const { wallets } = useWalletStore();
  
  return (
    <PageContentHeader className="flex flex-col space-y-6 bg-[#1A1F27] rounded-lg border border-[#2A2F38] p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PageContentTitle text="Overview" />
            <p className="text-sm text-[#A3A3A3] mt-1">
              Track your portfolio performance and activity
            </p>
          </motion.div>
        </div>
      </motion.div>
    </PageContentHeader>
  );
}