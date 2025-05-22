"use client";

import { AppRoute } from "@/common/enums/app-route";
import Link from "next/link";
import { motion } from "framer-motion";

export const Logo: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href={AppRoute.ROOT} 
        className="flex items-center gap-2 font-bold text-lg md:text-xl text-[#F0F0F0] hover:text-[#00FFC6] transition-colors duration-200"
      >
        <span>Auto Chain</span>
      </Link>
    </motion.div>
  );
}
