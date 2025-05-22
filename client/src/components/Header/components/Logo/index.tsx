"use client";

import { AppRoute } from "@/common/enums/app-route";
import Link from "next/link";

export const Logo: React.FC = () => {
  return (
    <Link 
      href={AppRoute.ROOT} 
      className="flex items-center gap-2 font-bold text-lg md:text-xl text-[#F0F0F0] hover:text-[#00FFC6] transition-colors duration-200"
    >
      <span>Auto Chain</span>
    </Link>
  );
}
