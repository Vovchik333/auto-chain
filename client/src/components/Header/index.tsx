import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";

export const Header: React.FC = () => {
  return (
    <header className="p-8 border-b shadow-sm flex items-center justify-between">
      <Logo />
      <Menu />
    </header>
  );
}
