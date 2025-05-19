import { create } from "zustand";
import { SuggestionsState, SuggestionsStore } from "./types";
import { suggestionsService } from "@/services/suggestions";

const initState: SuggestionsState = {
  diversification: null,
  isLoading: false,
  error: null
}

export const useSuggestionsStore = create<SuggestionsStore>((set) => ({
  ...initState,
  getDiversification: async (walletIds: string[]) => {
    set({ isLoading: true, error: null });

    try {
      const diversification = await suggestionsService.getDiversification(walletIds);

      set({ diversification, isLoading: false })
    } catch (err: any) {
      set({ error: err.message ?? 'Unknown error', isLoading: false })
    }
  },
}))
