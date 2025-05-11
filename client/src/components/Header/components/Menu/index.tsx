'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppRoute } from "@/common/enums/app-route";

const navLinks = [
  { name: "Overview", href: AppRoute.ROOT },
  { name: "Wallets", href: AppRoute.WALLETS },
  { name: "Transactions", href: AppRoute.TRANSACTIONS },
  { name: "Profile", href: AppRoute.PROFILE },
  { name: "Suggestions", href: AppRoute.SUGGESTIONS}
];

export const Menu: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-6 text-[#F0F0F0]">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`transition duration-200 ${
            pathname === link.href
              ? "text-[#00FFC6] font-semibold"
              : "text-[#A3A3A3] hover:text-[#00FFC6]"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
