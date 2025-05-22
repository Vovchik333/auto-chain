import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onClick: () => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  isPreventDefault?: boolean;
}

export const SecondaryButton: React.FC<Props> = ({
  onClick,
  children,
  type = "button",
  disabled,
  className,
  isPreventDefault = false
}) => {
  return (
    <Button 
      onClick={(e) => {
        if (isPreventDefault) {
          e.preventDefault();
        }

        onClick();
      }}
      type={type}
      disabled={disabled}
      className={cn(
        "bg-[#2A2F38] text-[#F0F0F0] border-none hover:bg-[#3A3F48] hover:text-[#00FFC6] transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </Button>
  );
}
