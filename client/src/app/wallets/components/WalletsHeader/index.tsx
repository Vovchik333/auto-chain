"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import ImportFromEtherscanButton from "@/app/wallets/components/ImportFromEtherscanButton";
import { useWalletStore } from "@/stores/wallet/wallet.store";

const WalletsHeader: React.FC = () => {
  const { wallets } = useWalletStore();

  return (
    <div className="flex justify-between py-4 border-b bg-[#1A1F27]">
      <div className="flex gap-4 flex-col">
        <h2 className="text-2xl font-semibold text-[#F0F0F0] flex items-center gap-1">
          Wallets <span className="text-sm text-[#A3A3A3]">({wallets.length})</span>
        </h2>
        <Input
          type="text"
          placeholder="Find wallet..."
          className="w-64 bg-[#2A2F38] text-[#F0F0F0] border-none focus:ring-[#00FFC6] focus:border-[#00FFC6] rounded"
        />
      </div>
      <div className="flex gap-2 flex-col">
        <ImportFromEtherscanButton />
        <Select.Root>
          <Select.Trigger className="inline-flex items-center justify-between px-3 py-1 bg-[#2A2F38] text-[#00FFC6] font-medium rounded focus:outline-none">
            <Select.Value placeholder="Sort by Date Added" />
            <Select.Icon>
              <ChevronDown className="ml-1 h-4 w-4 text-[#00FFC6]" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="bg-[#2A2F38] rounded shadow-lg mt-2">
              <Select.ScrollUpButton className="flex items-center justify-center text-[#A3A3A3]">
                <ChevronUp />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-2">
                {["Date Added", "Name", "Balance"].map((option) => (
                  <Select.Item
                    key={option}
                    value={option}
                    className="flex items-center justify-between px-3 py-2 rounded hover:bg-[#00FFC6] text-[#F0F0F0] cursor-pointer"
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check className="w-4 h-4 text-[#00FFC6]" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex items-center justify-center text-[#A3A3A3]">
                <ChevronDown />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
};

export default WalletsHeader;
