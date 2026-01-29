'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavUser } from '../ui/nav-user';
import { Route } from '@/types';
import { adminRoutes } from '@/routes/adminRoutes';
import Link from 'next/link';
import { ROLES } from '@/constants/roles';
import { studentRoutes } from '@/routes/studentRoutes';
import { tutorRoutes } from '@/routes/tutorRoutes';

// This is sample data.
export interface UserType {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  phone: string;
  status: string;
  id: string;
  bio?: string;
}

export function DashboardSidebar({
  user,
  ...props
}: {
  user: UserType & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];
  switch (user.role) {
    case ROLES.ADMIN:
      routes = adminRoutes;
      break;
    case ROLES.TUTOR:
      routes = tutorRoutes;
      break;
    case ROLES.STUDENT:
      routes = studentRoutes;
      break;
    default:
      routes = [];
      break;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        {routes.map(item => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
