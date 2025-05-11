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
    <nav className="flex space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`hover:text-blue-600 transition ${
            pathname === link.href ? "text-blue-600 font-semibold" : "text-gray-700"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
