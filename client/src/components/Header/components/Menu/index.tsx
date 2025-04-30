'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppRoute } from "@/common/enums/app-route";

const navLinks = [
  { name: "Home", href: AppRoute.ROOT },
  { name: "Analytics", href: AppRoute.ANALYTICS },
  { name: "Security", href: AppRoute.SECURITY },
  { name: "Profile", href: AppRoute.PROFILE },
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
