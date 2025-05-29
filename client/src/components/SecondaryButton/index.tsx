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
  variant?: 'default' | 'outline' | 'ghost';
}

export const SecondaryButton: React.FC<Props> = ({
  onClick,
  children,
  type = "button",
  disabled,
  className,
  isPreventDefault = false,
  variant = 'default'
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
        "font-medium rounded-box-lg theme-transition hover-effect focus-ring",
        variant === 'default' && "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
        variant === 'outline' && "border-2 border-secondary text-secondary-foreground hover:bg-secondary/10",
        variant === 'ghost' && "text-secondary-foreground hover:bg-secondary/10",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary disabled:hover:transform-none",
        className
      )}
    >
      {children}
    </Button>
  );
}
