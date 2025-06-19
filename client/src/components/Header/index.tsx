import { LanguageSwitcher } from "../LanguageSwitcher";
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";
import { ThemeToggle } from "../ThemeToggle";

export const Header: React.FC = () => {
  return (
    <header 
      className="sticky top-0 flex justify-between py-6 px-8 border-b border-border theme-transition z-[999]"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-[1]" />
      <Logo />
      <div className="flex items-center gap-4">
        <div className="rounded-box-lg bg-secondary/50 backdrop-blur-sm p-2 flex items-center gap-2">
          <ThemeToggle />
          <div className="w-px h-4 bg-border" />
          <LanguageSwitcher />
        </div>
        <Menu />
      </div>
    </header>
  );
}
