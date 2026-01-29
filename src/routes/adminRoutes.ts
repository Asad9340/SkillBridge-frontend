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
        url: '/admin-dashboard/manage-users',
      },
      {
        title: 'Manage Categories',
        url: '/admin-dashboard/manage-categories',
      },
      {
        title: 'Manage Subjects',
        url: '/admin-dashboard/manage-subjects',
      },
    ],
  },
];
