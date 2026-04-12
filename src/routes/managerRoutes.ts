import { Route } from '@/types';

export const managerRoutes: Route[] = [
  {
    title: 'Manager',
    items: [
      { title: 'Home', url: '/' },
      { title: 'Dashboard', url: '/dashboard' },
      { title: 'Operations', url: '/dashboard/operations' },
      { title: 'Team Oversight', url: '/dashboard/team-oversight' },
      { title: 'Tutor Oversight', url: '/dashboard/manage-tutors' },
      { title: 'Statistics', url: '/dashboard/statistics' },
      { title: 'Profile', url: '/dashboard/profile' },
      { title: 'Update Profile', url: '/dashboard/update-profile' },
    ],
  },
];
