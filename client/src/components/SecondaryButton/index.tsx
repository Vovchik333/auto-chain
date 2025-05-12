import { ReactNode } from "react";
import { Button } from "../ui/button";

type Props = {
  onClick: () => void;
  children: ReactNode;
}

export const SecondaryButton: React.FC<Props> = ({
  onClick,
  children
}) => {
  return (
    <Button 
      onClick={onClick} 
      className="bg-[#2A2F38] text-[#F0F0F0] border-none hover:bg-[#3A3F48] hover:text-[#00FFC6] transition-colors cursor-pointer"
    >
      {children}
    </Button>
  );
}
