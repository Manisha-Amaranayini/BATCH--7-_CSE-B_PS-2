import { Button } from '@/components/ui/button';
import { ArrowUpDown, Calendar, Star, Users, Heart, Clock } from 'lucide-react';

export type SortOption = 
  | 'title-asc' 
  | 'title-desc' 
  | 'year-desc' 
  | 'year-asc' 
  | 'rating-desc' 
  | 'rating-asc'
  | 'personal-rating-desc'
  | 'personal-rating-asc'
  | 'recently-added'
  | 'popularity';

interface SortControlsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  showPersonalRating?: boolean;
  className?: string;
}

export const SortControls = ({ 
  currentSort, 
  onSortChange, 
  showPersonalRating = false,
  className = ''
}: SortControlsProps) => {
  
  const sortOptions: { value: SortOption; label: string; icon: any }[] = [
    { value: 'title-asc', label: 'Title A-Z', icon: ArrowUpDown },
    { value: 'title-desc', label: 'Title Z-A', icon: ArrowUpDown },
    { value: 'year-desc', label: 'Newest First', icon: Calendar },
    { value: 'year-asc', label: 'Oldest First', icon: Calendar },
    { value: 'rating-desc', label: 'Highest Rated', icon: Star },
    { value: 'rating-asc', label: 'Lowest Rated', icon: Star },
    ...(showPersonalRating ? [
      { value: 'personal-rating-desc' as SortOption, label: 'My Best Rated', icon: Heart },
      { value: 'personal-rating-asc' as SortOption, label: 'My Worst Rated', icon: Heart },
    ] : []),
    { value: 'recently-added', label: 'Recently Added', icon: Clock },
    { value: 'popularity', label: 'Most Popular', icon: Users },
  ];

  const getCurrentSortLabel = () => {
    return sortOptions.find(option => option.value === currentSort)?.label || 'Sort By';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
      
      <div className="relative">
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="
            appearance-none bg-cyber-grey border border-cyber-light rounded-md 
            px-4 py-2 pr-8 text-sm font-medium text-foreground
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
            hover:bg-cyber-light transition-colors cursor-pointer
          "
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value} className="bg-cyber-dark text-foreground">
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ArrowUpDown size={14} className="text-muted-foreground" />
        </div>
      </div>

      {/* Sort direction indicator for mobile */}
      <div className="hidden sm:flex items-center space-x-1">
        {sortOptions.map(option => {
          if (option.value === currentSort) {
            const Icon = option.icon;
            return (
              <div key={option.value} className="flex items-center text-primary">
                <Icon size={14} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

// Helper function to sort arrays based on sort option
export const applySorting = <T extends {
  title: string;
  year: number;
  rating: number;
  personalRating?: number;
  id: number;
}>(items: T[], sortOption: SortOption): T[] => {
  const sorted = [...items];

  switch (sortOption) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year);
    
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year);
    
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    
    case 'rating-asc':
      return sorted.sort((a, b) => a.rating - b.rating);
    
    case 'personal-rating-desc':
      return sorted.sort((a, b) => (b.personalRating || 0) - (a.personalRating || 0));
    
    case 'personal-rating-asc':
      return sorted.sort((a, b) => (a.personalRating || 0) - (b.personalRating || 0));
    
    case 'recently-added':
      // Simulate recently added by ID (higher ID = more recent)
      return sorted.sort((a, b) => b.id - a.id);
    
    case 'popularity':
      // Simulate popularity by combining rating and a popularity factor
      return sorted.sort((a, b) => (b.rating * 100 + b.id) - (a.rating * 100 + a.id));
    
    default:
      return sorted;
  }
};