import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export const PageContentHeader: React.FC<Props> = ({
  className,
  children
}) => {
  return (
    <div className={cn(
      "p-6 border-b border-border theme-transition",
      "bg-background/50 backdrop-blur-sm",
      className
    )}>
      {children}
    </div>
  );
}