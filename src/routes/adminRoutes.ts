import { Route } from '@/types';

export const adminRoutes: Route[] = [
  {
    title: 'Admin Profile',
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
      { title: 'Update Profile', url: '/dashboard/update-profile' },
      {
        title: 'Statistics',
        url: '/dashboard/statistics',
      },
      {
        title: 'Manage Users',
        url: '/dashboard/manage-users',
      },
      {
        title: 'Manage Tutors',
        url: '/dashboard/manage-tutors',
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
