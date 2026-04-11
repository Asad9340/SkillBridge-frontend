import { env } from '../../env';
import { EventsResponse } from '@/types/event.type';

const API_URL = env.API_URL;

export interface GetEventsParams {
  search?: string;
  category?: string;
  status?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

export const eventsService = {
  getAllEvents: async (params?: GetEventsParams) => {
    try {
      const url = new URL(`${API_URL}/events`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            url.searchParams.append(key, value);
          }
        });
      }

      const res = await fetch(url.toString(), {
        cache: 'no-store',
        next: { tags: ['events'] },
      });

      if (!res.ok) {
        return { data: null, error: `Failed to fetch events: ${res.status}` };
      }

      const json = await res.json();

      return json.success === true
        ? ({ data: json.data as EventsResponse, error: null } as const)
        : ({ data: null, error: json.message } as const);
    } catch (error) {
      return { data: null, error } as const;
    }
  },
};
