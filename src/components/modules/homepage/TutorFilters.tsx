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

interface TutorFiltersProps {
  categories: { id: string; name: string }[];
}

const TutorFilters: React.FC<TutorFiltersProps> = ({ categories }) => {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params?.get('search') || '');
  const [category, setCategory] = useState(params?.get('category') || 'all');

  const buildQueryString = (overrides?: Record<string, string>) => {
    const query: Record<string, string> = {};

    if (search.trim()) query.search = search.trim();
    if (category && category !== 'all') query.category = category;

    if (overrides) {
      Object.assign(query, overrides);
    }

    return new URLSearchParams(query).toString();
  };

  const handleSearch = () => {
    const queryString = buildQueryString({ page: '1' });
    router.push(queryString ? `?${queryString}` : '/tutors');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <Input
        placeholder="Search by subject, rating, or price"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="flex-1"
      />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categories.map(cat => (
            <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleSearch}>Search</Button>
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
