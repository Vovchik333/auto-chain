'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppRoute } from "@/common/enums/app-route";
import { useUserStore } from "@/stores/user/user.store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X, User } from "lucide-react";

const navLinks = [
  { name: "Overview", href: AppRoute.ROOT },
  { name: "Wallets", href: AppRoute.WALLETS },
  { name: "Transactions", href: AppRoute.TRANSACTIONS },
  { name: "Profile", href: AppRoute.PROFILE },
  { name: "Suggestions", href: AppRoute.SUGGESTIONS}
];

export const Menu: React.FC = () => {
  const pathname = usePathname();
  const { signOut, user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <div className="relative">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-[#F0F0F0] hover:text-[#00FFC6] transition-colors"
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      {/* Desktop menu */}
      <nav className="hidden md:flex items-center space-x-6 text-[#F0F0F0]">
        {navLinks.map((link) => (
          <motion.div
            key={link.href}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <Link
              href={link.href}
              className={`transition-colors duration-200 ${
                pathname === link.href
                  ? "text-[#00FFC6] font-semibold"
                  : "text-[#A3A3A3] hover:text-[#00FFC6]"
              }`}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
        {user !== null && (
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <button
              onClick={() => {
                signOut();
                window.location.reload();
              }}
              className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#00FFC6] transition-colors duration-200"
            >
              <User className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </motion.div>
        )}
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full right-0 mt-4 p-4 bg-[#1A1F27] border border-[#2A2F38] rounded-lg shadow-xl md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#F0F0F0] hover:text-[#00FFC6] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-[#00FFC6] font-semibold"
                      : "text-[#A3A3A3] hover:text-[#00FFC6]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user !== null && (
                <button
                  onClick={() => {
                    signOut();
                    window.location.reload();
                  }}
                  className="flex items-center gap-2 text-[#A3A3A3] hover:text-[#00FFC6] transition-colors duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
