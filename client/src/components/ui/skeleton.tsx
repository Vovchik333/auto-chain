import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-box-lg bg-muted/80 theme-transition",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton } 