import { Route } from '@/types';

export const tutorRoutes: Route[] = [
  {
    title: 'Tutor Profile',
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
        title: 'Manage Availability',
        url: '/dashboard/manage-availability',
      },
      {
        title: 'Manage Session',
        url: '/dashboard/manage-session',
      },
      {
        title: 'Reviews and Rating',
        url: '/dashboard/reviews-and-rating',
      },
    ],
  },
];
