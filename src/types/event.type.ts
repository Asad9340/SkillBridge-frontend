export type EventStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  startsAt: string;
  endsAt: string;
  price: number;
  rating: number;
  status: EventStatus;
  mediaUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  filters: {
    categories: string[];
  };
  data: EventItem[];
}
