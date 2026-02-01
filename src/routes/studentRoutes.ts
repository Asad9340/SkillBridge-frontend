import { Route } from '@/types';

export const studentRoutes: Route[] = [
  {
    title: 'Student Profile',
    items: [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Dashboard',
        url: '/dashboard',
      },
      {
        title: 'Profile',
        url: '/dashboard/profile',
      },
      {
        title: 'Update Profile',
        url: '/dashboard/update-profile',
      },
      {
        title: 'Join as Tutor',
        url: '/join-as-tutor',
      },
      {
        title: 'My Bookings',
        url: '/dashboard/my-bookings',
      },
      {
        title: 'Reviews',
        url: '/dashboard/reviews',
      },
    ],
  },
];
