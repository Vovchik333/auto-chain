import { ReactNode } from "react";
import { Button } from "../ui/button";

type Props = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: ReactNode;
}

export const PrimaryButton: React.FC<Props> = ({
  type,
  onClick,
  children
}) => {
  return (
    <Button 
      type={type}
      onClick={onClick} 
      className="bg-[#00FFC6] hover:bg-[#00e6b2] text-[#1A1F27] font-medium cursor-pointer transition-colors"
    >
      {children}
    </Button>
  );
}
