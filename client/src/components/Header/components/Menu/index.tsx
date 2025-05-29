'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppRoute } from "@/common/enums/app-route";
import { useUserStore } from "@/stores/user/user.store";
import { useState } from "react";
import { Menu as MenuIcon, X, User } from "lucide-react";
import { useTranslations } from 'next-intl';

export const Menu: React.FC = () => {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const { signOut, user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: t('overview'), href: AppRoute.ROOT },
    { name: t('wallets'), href: AppRoute.WALLETS },
    { name: t('transactions'), href: AppRoute.TRANSACTIONS },
    { name: t('profile'), href: AppRoute.PROFILE },
    { name: t('suggestions'), href: AppRoute.SUGGESTIONS}
  ];

  return (
    <div className="relative">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-foreground hover:text-primary theme-transition rounded-box-lg hover:bg-secondary/50"
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      <nav className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`theme-transition hover-effect ${
              pathname === link.href
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-primary"
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
            className="flex items-center gap-2 text-muted-foreground hover:text-primary theme-transition hover-effect"
          >
            <User className="w-4 h-4" />
            <span>{t('signOut')}</span>
          </button>
        )}
      </nav>
      {isOpen && (
        <div className="absolute top-full right-0 mt-4 p-4 rounded-box-lg bg-background border-border shadow-lg backdrop-blur-sm md:hidden theme-transition">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-foreground hover:text-primary theme-transition rounded-box-lg hover:bg-secondary/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`theme-transition hover-effect ${
                  pathname === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
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
                className="flex items-center gap-2 text-muted-foreground hover:text-primary theme-transition hover-effect"
              >
                <User className="w-4 h-4" />
                <span>{t('signOut')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
