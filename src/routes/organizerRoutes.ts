import { Route } from '@/types';

export const organizerRoutes: Route[] = [
  {
    title: 'Organizer',
    items: [
      { title: 'Home', url: '/' },
      { title: 'Dashboard', url: '/dashboard' },
      { title: 'My Events', url: '/dashboard/my-events' },
      { title: 'Event Pipeline', url: '/dashboard/event-pipeline' },
      { title: 'Event Insights', url: '/dashboard/event-insights' },
      { title: 'Profile', url: '/dashboard/profile' },
      { title: 'Update Profile', url: '/dashboard/update-profile' },
    ],
  },
];
