import { create } from 'zustand';
import { StatisticsDto } from '@/common/types/stats/statistics.dto';
import { StatisticsService } from '@/services/statistics/statistics.service';
import { StatsFilterDto } from '@/common/types/stats/stats-filter.dto';
import { statsService } from '@/services/statistics';

type StatisticsState = {
  stats: StatisticsDto | null;
  isLoading: boolean;
  error: string | null;
};

const initState: StatisticsState = {
  stats: null,
  isLoading: false,
  error: null,
}

type StatisticsActions = {
  loadStats: (filter: StatsFilterDto) => Promise<void>;
  resetError: () => void;
};

export type StatisticsStore = StatisticsState & StatisticsActions;

export const useStatsStore = create<StatisticsStore>((set) => ({
  ...initState,
  loadStats: async (filter: StatsFilterDto) => {
    try {
      set({ isLoading: true });
      const stats = await statsService.getStatsByFilter(filter);
      set({ stats, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load wallet statistics',
        isLoading: false 
      });
    }
  },
  resetError: () => {
    set({ error: null });
  },
}))
