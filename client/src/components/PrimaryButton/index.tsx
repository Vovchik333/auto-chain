import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export const PrimaryButton: React.FC<Props> = ({
  type,
  onClick,
  children,
  disabled,
  className,
  variant = 'default'
}) => {
  return (
    <Button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "font-medium rounded-md theme-transition hover-effect focus-ring",
        variant === 'default' && "bg-primary hover:bg-primary/90 text-primary-foreground",
        variant === 'outline' && "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        variant === 'ghost' && "text-primary hover:bg-primary/10",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:transform-none",
        className
      )}
    >
      {children}
    </Button>
  );
}
