import { create } from 'zustand';
import { Category } from '@/common/types/category';
import { CategoryService } from '@/services/category/category.service';

type CategoryState = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
};

type CategoryActions = {
  loadCategories: () => Promise<void>;
  resetError: () => void;
};

export type CategoryStore = CategoryState & CategoryActions;

export const createCategoryStore = (categoryService: CategoryService) => {
  return create<CategoryStore>((set) => ({
    categories: [],
    isLoading: false,
    error: null,

    loadCategories: async () => {
      try {
        set({ isLoading: true });
        const categories = await categoryService.getCategories();
        set({ categories, isLoading: false });
      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to load categories',
          isLoading: false 
        });
      }
    },

    resetError: () => {
      set({ error: null });
    },
  }));
}; 