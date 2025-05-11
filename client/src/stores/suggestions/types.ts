import { DiversificationDto } from "@/common/types/diversification.dto";

export type SuggestionsState = {
  diversification: DiversificationDto | null;
  isLoading: boolean;
  error: string | null;
}

export type SuggestionsActions = {
  getDiversification: (walletIds: string[]) => Promise<void>;
}

export type SuggestionsStore = SuggestionsState & SuggestionsActions;
