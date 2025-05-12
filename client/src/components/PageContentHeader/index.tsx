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
    <div className={cn("pb-4 border-b border-[#525256] mb-4", className)}>
      {children}
    </div>
  );
}