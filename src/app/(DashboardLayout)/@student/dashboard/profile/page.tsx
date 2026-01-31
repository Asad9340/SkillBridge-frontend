import { userService } from '@/services/user.service';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import Link from 'next/link';

const statusVariantMap = {
  ACTIVE: 'default',
  INACTIVE: 'secondary',
  SUSPENDED: 'destructive',
} as const;

const UserProfile = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData?.user as User;

  if (!userInfo) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center text-muted-foreground">
        No user session found
      </div>
    );
  }

  const initials = userInfo.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6 w-full">
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-28 w-28 border">
              <AvatarImage src={userInfo.image || undefined} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <CardTitle className="text-2xl">{userInfo.name}</CardTitle>
              <CardDescription className="text-base">
                {userInfo.email}
              </CardDescription>

              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{userInfo.role}</Badge>

                <Badge variant={statusVariantMap[userInfo.status]}>
                  {userInfo.status}
                </Badge>

                {userInfo.emailVerified && (
                  <Badge variant="outline">Verified</Badge>
                )}
              </div>
            </div>
          </div>

          <Link href="/dashboard/update-profile">
            <Button variant="outline">Edit Profile</Button>
          </Link>
        </CardHeader>
      </Card>

      <Card className="rounded-2xl p-4 gap-3">
        <CardHeader>
          <CardTitle className="text-lg">Contact</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">Phone</p>
            <p className="font-medium">{userInfo.phone || 'Not provided'}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl p-4 gap-3">
        <CardHeader>
          <CardTitle className="text-lg">Bio</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {userInfo.bio || 'No bio added yet.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
