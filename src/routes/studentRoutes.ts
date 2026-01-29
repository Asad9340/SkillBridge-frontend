import { Route } from '@/types';

export const studentRoutes: Route[] = [
  {
    title: 'Student Profile',
    items: [
      {
        title: 'Create Blog',
        url: '/dashboard/create-blog',
      },
      {
        title: 'My Blogs',
        url: '/dashboard/my-blogs',
      },
    ],
  },
];
