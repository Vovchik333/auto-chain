import { Button } from "../ui/button";
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";

export const Header: React.FC = () => {
  return (
    <header className="p-2 flex justify-between">
      <Logo />
      <Menu/>
    </header>
  );
}
