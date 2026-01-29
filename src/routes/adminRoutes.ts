import { Route } from '@/types';

export const adminRoutes: Route[] = [
  {
    title: 'Admin Profile',
    items: [
      // {
      //   title: 'Analytics',
      //   url: '/analytics',
      // },
      {
        title: 'Manage Users',
        url: '/dashboard/manage-users',
      },
      {
        title: 'Manage Categories',
        url: '/dashboard/manage-categories',
      },
      {
        title: 'Manage Subjects',
        url: '/dashboard/manage-subjects',
      },
    ],
  },
];
