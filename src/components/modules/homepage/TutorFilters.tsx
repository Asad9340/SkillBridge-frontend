'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface TutorFiltersProps {
  categories: { id: string; name: string }[];
}

const TutorFilters: React.FC<TutorFiltersProps> = ({ categories }) => {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params?.get('search') || '');
  const [category, setCategory] = useState(params?.get('category') || 'all');
  const [minPrice, setMinPrice] = useState(params?.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(params?.get('maxPrice') || '');
  const [minRating, setMinRating] = useState(params?.get('minRating') || 'all');
  const [sortBy, setSortBy] = useState(params?.get('sortBy') || 'rating');
  const [sortOrder, setSortOrder] = useState(
    params?.get('sortOrder') || 'desc',
  );
  const [showAdvanced, setShowAdvanced] = useState(
    !!(
      params?.get('minPrice') ||
      params?.get('maxPrice') ||
      params?.get('minRating')
    ),
  );

  const hasActiveFilters =
    search || category !== 'all' || minPrice || maxPrice || minRating !== 'all';

  const buildQueryString = (overrides?: Record<string, string>) => {
    const query: Record<string, string> = {};
    if (search.trim()) query.search = search.trim();
    if (category && category !== 'all') query.category = category;
    if (minPrice) query.minPrice = minPrice;
    if (maxPrice) query.maxPrice = maxPrice;
    if (minRating && minRating !== 'all') query.minRating = minRating;
    if (sortBy && sortBy !== 'rating') query.sortBy = sortBy;
    if (sortOrder && sortOrder !== 'desc') query.sortOrder = sortOrder;
    if (overrides) Object.assign(query, overrides);
    return new URLSearchParams(query).toString();
  };

  const handleSearch = () => {
    const qs = buildQueryString({ page: '1' });
    router.push(qs ? `/tutors?${qs}` : '/tutors');
  };

  const handleReset = () => {
    setSearch('');
    setCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('all');
    setSortBy('rating');
    setSortOrder('desc');
    router.push('/tutors');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-4">
      {/* Primary row: search, category, sort, search button */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, subject, or bio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={`${sortBy}-${sortOrder}`}
          onValueChange={v => {
            const [field, order] = v.split('-');
            setSortBy(field);
            setSortOrder(order);
          }}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating-desc">Rating: High → Low</SelectItem>
            <SelectItem value="rating-asc">Rating: Low → High</SelectItem>
            <SelectItem value="hourlyRate-asc">Price: Low → High</SelectItem>
            <SelectItem value="hourlyRate-desc">Price: High → Low</SelectItem>
            <SelectItem value="totalReviews-desc">Most Reviewed</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setShowAdvanced(prev => !prev)}
          className="gap-2 shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold">
              ✓
            </span>
          )}
        </Button>

        <Button onClick={handleSearch} className="shrink-0">
          Search
        </Button>
      </div>

      {/* Advanced filters row */}
      {showAdvanced && (
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t">
          <div className="flex gap-2 items-center flex-1">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Price (৳):
            </span>
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="w-24"
              min={0}
            />
            <span className="text-muted-foreground">—</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="w-24"
              min={0}
            />
          </div>

          <Select value={minRating} onValueChange={setMinRating}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Min Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Rating</SelectItem>
              <SelectItem value="4.5">4.5+ ⭐</SelectItem>
              <SelectItem value="4">4.0+ ⭐</SelectItem>
              <SelectItem value="3.5">3.5+ ⭐</SelectItem>
              <SelectItem value="3">3.0+ ⭐</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorFilters;

// Helper to build pagination URLs with filters preserved
export const buildPaginationUrl = (
  searchParams: Record<string, string | undefined>,
  page: number,
): string => {
  const query: Record<string, string> = {};

  if (searchParams.search) query.search = searchParams.search;
  if (searchParams.category && searchParams.category !== 'all')
    query.category = searchParams.category;

  query.page = String(page);

  return `?${new URLSearchParams(query).toString()}`;
};
