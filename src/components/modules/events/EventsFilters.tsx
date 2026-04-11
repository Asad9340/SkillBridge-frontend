'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EventsFiltersProps {
  categories: string[];
}

const EventsFilters = ({ categories }: EventsFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = useMemo(() => {
    const get = (key: string, fallback = '') =>
      searchParams?.get(key) || fallback;

    return {
      search: get('search'),
      category: get('category', 'ALL'),
      status: get('status', 'ALL'),
      location: get('location'),
      minPrice: get('minPrice'),
      maxPrice: get('maxPrice'),
      minRating: get('minRating'),
      dateFrom: get('dateFrom'),
      dateTo: get('dateTo'),
      sortBy: get('sortBy', 'startsAt'),
      sortOrder: get('sortOrder', 'asc'),
    };
  }, [searchParams]);

  const [filters, setFilters] = useState(initial);

  useEffect(() => {
    setFilters(initial);
  }, [initial]);

  const update = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams?.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'ALL') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set('page', '1');
    router.push(`/events?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/events');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4 rounded-2xl border p-4">
        <h3 className="font-semibold">Filters</h3>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Category</label>
          <Select
            value={filters.category}
            onValueChange={value => update('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Status</label>
          <Select
            value={filters.status}
            onValueChange={value => update('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="UPCOMING">Upcoming</SelectItem>
              <SelectItem value="ONGOING">Ongoing</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Location</label>
          <Input
            value={filters.location}
            onChange={e => update('location', e.target.value)}
            placeholder="Dhaka"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Min Price</label>
            <Input
              type="number"
              value={filters.minPrice}
              onChange={e => update('minPrice', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Max Price</label>
            <Input
              type="number"
              value={filters.maxPrice}
              onChange={e => update('maxPrice', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">
            Minimum Rating
          </label>
          <Input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={filters.minRating}
            onChange={e => update('minRating', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Date From</label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={e => update('dateFrom', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Date To</label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={e => update('dateTo', e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" onClick={applyFilters}>
            Apply
          </Button>
          <Button variant="outline" className="flex-1" onClick={clearFilters}>
            Reset
          </Button>
        </div>
      </aside>

      <div className="space-y-4 rounded-2xl border p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            className="sm:col-span-2"
            placeholder="Search events by title, category, location"
            value={filters.search}
            onChange={e => update('search', e.target.value)}
          />

          <Select
            value={filters.sortBy}
            onValueChange={value => update('sortBy', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startsAt">Date</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="createdAt">Newest</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sortOrder}
            onValueChange={value => update('sortOrder', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button onClick={applyFilters}>Search & Sort</Button>
        </div>
      </div>
    </div>
  );
};

export default EventsFilters;
