import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { Category } from "@/common/types/category";

interface CategorySelectProps {
  categories: Category[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function CategorySelect({ categories, value, onValueChange, className }: CategorySelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-[#2A2F3A] bg-[#232936] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <SelectPrimitive.Value>
          {categories.find(cat => cat.id === value)?.name || "Select category"}
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="relative z-50 min-w-[200px] overflow-hidden rounded-md border border-[#2A2F3A] bg-[#232936] text-[#F0F0F0] shadow-md animate-in fade-in-80"
        >
          <SelectPrimitive.Viewport className="p-1">
            {categories.map((category) => (
              <SelectPrimitive.Item
                key={category.id}
                value={category.id}
                className={cn(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-[#2A2F3A] focus:text-[#00FFC6] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  value === category.id && "bg-[#2A2F3A] text-[#00FFC6]"
                )}
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
                    <Check className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>{category.name}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
} 