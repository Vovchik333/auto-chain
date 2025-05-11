"use client";

import React from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import ImportFromEtherscanButton from "@/components/ImportFromEtherscanButton";
import { useWalletStore } from "@/stores/wallet/wallet.store";

const WalletsHeader: React.FC = () => {
  const { wallets } = useWalletStore();

  return (
    <div className="flex justify-between py-4 border-b bg-white">
      <div className="flex gap-4 flex-col">
        <h2 className="text-2xl font-semibold">
          Wallets <span className="text-sm text-gray-500 ml-1">({wallets.length})</span>
        </h2>
        <Input
          type="text"
          placeholder="Find wallet..."
          className="w-64"
        />
      </div>
      <div className="flex gap-2 flex-col">
        <ImportFromEtherscanButton />
        <Select.Root>
          <Select.Trigger className="inline-flex items-center justify-between px-3 py-1 bg-blue-100 text-blue-600 font-medium rounded focus:outline-none">
            <Select.Value placeholder="Sort by Date Added" />
            <Select.Icon>
              <ChevronDown className="ml-1 h-4 w-4" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="bg-white rounded shadow-lg mt-2">
              <Select.ScrollUpButton className="flex items-center justify-center text-gray-500">
                <ChevronUp />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-2">
                {["Date Added", "Name", "Balance"].map((option) => (
                  <Select.Item
                    key={option}
                    value={option}
                    className="flex items-center justify-between px-3 py-2 rounded hover:bg-blue-100 text-gray-800 cursor-pointer"
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check className="w-4 h-4 text-blue-600" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex items-center justify-center text-gray-500">
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
