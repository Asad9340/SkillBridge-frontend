import { Route } from '@/types';

export const studentRoutes: Route[] = [
  {
    title: 'Student',
    items: [
      { title: 'Home', url: '/' },
      { title: 'Dashboard', url: '/dashboard' },
      { title: 'My Bookings', url: '/dashboard/my-bookings' },
      { title: 'Reviews', url: '/dashboard/reviews' },
      { title: 'Statistics', url: '/dashboard/statistics' },
      { title: 'Profile', url: '/dashboard/profile' },
      { title: 'Update Profile', url: '/dashboard/update-profile' },
      { title: 'Join as Tutor', url: '/join-as-tutor' },
    ],
  },
];
