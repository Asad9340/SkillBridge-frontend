import { Route } from '@/types';

export const superAdminRoutes: Route[] = [
  {
    title: 'Super Admin',
    items: [
      { title: 'Home', url: '/' },
      { title: 'Dashboard', url: '/dashboard' },
      { title: 'Manage All Users', url: '/dashboard/manage-users' },
      { title: 'Role Management', url: '/dashboard/role-management' },
      { title: 'System Metrics', url: '/dashboard/system-metrics' },
      { title: 'Statistics', url: '/dashboard/statistics' },
      { title: 'Profile', url: '/dashboard/profile' },
      { title: 'Update Profile', url: '/dashboard/update-profile' },
    ],
  },
];
