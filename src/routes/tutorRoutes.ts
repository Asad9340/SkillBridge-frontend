import { Route } from '@/types';

export const tutorRoutes: Route[] = [
  {
    title: 'Tutor',
    items: [
      { title: 'Home', url: '/' },
      { title: 'Dashboard', url: '/dashboard' },
      { title: 'Manage Availability', url: '/dashboard/manage-availability' },
      { title: 'Manage Sessions', url: '/dashboard/manage-session' },
      { title: 'Reviews & Ratings', url: '/dashboard/reviews-and-rating' },
      { title: 'Statistics', url: '/dashboard/statistics' },
      { title: 'Profile', url: '/dashboard/profile' },
      { title: 'Update Profile', url: '/dashboard/update-profile' },
    ],
  },
];
