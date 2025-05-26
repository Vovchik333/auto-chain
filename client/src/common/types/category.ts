export type Category = {
  id: string;
  name: string;
  icon?: string;
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'food', name: 'Food & Dining' },
  { id: 'transport', name: 'Transportation' },
  { id: 'shopping', name: 'Shopping' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'bills', name: 'Bills & Utilities' },
  { id: 'health', name: 'Healthcare' },
  { id: 'education', name: 'Education' },
  { id: 'travel', name: 'Travel' },
  { id: 'business', name: 'Business' },
  { id: 'other', name: 'Other' }
]; 