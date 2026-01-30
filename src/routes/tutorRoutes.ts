import { Route } from '@/types';

export const tutorRoutes: Route[] = [
  {
    title: 'Tutor Profile',
    items: [
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
        title: 'Add Availability',
        url: '/dashboard/add-availability',
      },
      {
        title: 'Manage Session',
        url: '/dashboard/manage-session',
      },
      {
        title: 'Review and Rating',
        url: '/dashboard/review-and-rating',
      },
    ],
  },
];
