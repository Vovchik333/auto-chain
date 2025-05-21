import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const PrimaryButton: React.FC<Props> = ({
  type,
  onClick,
  children,
  disabled,
  className
}) => {
  return (
    <Button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "bg-[#00FFC6] hover:bg-[#00e6b2] text-[#1A1F27] font-medium cursor-pointer transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00FFC6]",
        className
      )}
    >
      {children}
    </Button>
  );
}
