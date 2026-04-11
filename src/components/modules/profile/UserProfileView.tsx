import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ProfileUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | string | null;
  emailVerified?: boolean;
  phone?: string | null;
  bio?: string | null;
};

const statusVariantMap: Record<
  string,
  'default' | 'secondary' | 'destructive'
> = {
  ACTIVE: 'default',
  INACTIVE: 'secondary',
  SUSPENDED: 'destructive',
};

const getInitials = (name?: string | null) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export const UserProfileView = ({ user }: { user: ProfileUser }) => {
  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-24 w-24 border">
              <AvatarImage
                src={user.image || undefined}
                alt={user.name || 'User'}
              />
              <AvatarFallback className="text-2xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <CardTitle className="text-2xl">
                {user.name || 'Unnamed User'}
              </CardTitle>
              <CardDescription className="text-sm">
                {user.email || 'No email found'}
              </CardDescription>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{user.role || 'UNKNOWN'}</Badge>
                <Badge
                  variant={statusVariantMap[user.status || ''] || 'secondary'}
                >
                  {user.status || 'UNKNOWN'}
                </Badge>
                {user.emailVerified ? (
                  <Badge variant="outline">Verified</Badge>
                ) : null}
              </div>
            </div>
          </div>

          <Link href="/dashboard/update-profile">
            <Button variant="outline">Edit Profile</Button>
          </Link>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Phone Number</p>
            <p className="font-medium text-base">
              {user.phone || 'Not provided'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bio</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <p className="text-sm leading-6 text-muted-foreground">
              {user.bio || 'No bio has been added yet.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
