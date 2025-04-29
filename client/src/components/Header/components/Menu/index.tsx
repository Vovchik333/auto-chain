'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Analytics", href: "/analytics" },
  { name: "Security", href: "/security" },
  { name: "Profile", href: "/profile" },
];

export const Menu: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex space-x-6">
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