/* eslint-disable @typescript-eslint/no-explicit-any */
import { tutorService } from '@/services/tutor.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, BookOpen } from 'lucide-react';
import BookSessionButton from '@/components/modules/tutor/BookSessionButton';
import { User } from '@/types';
import { userService } from '@/services/user.service';

const TutorProfileDetailsPage = async ({
  params,
}: {
  params: Promise<{ tutorId: string }>;
}) => {
  const { tutorId } = await params;
  const { data: tutor } = await tutorService.getTutorProfile(tutorId);
    const { data: sessionData } = await userService.getSession();
    const userInfo = sessionData.user as User;
  console.log(tutor)
  if (!tutor) {
    return <div className="p-10 text-center">Tutor not found</div>;
  }

  const subjects = [
    ...new Map(
      tutor.availability.map((a: any) => [
        a.subjectId,
        { name: a.subjectName, category: a.categoryName },
      ]),
    ).values(),
  ];

  const initials = tutor.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-8 flex flex-col md:flex-row gap-8 md:items-center">
          <Avatar className="h-28 w-28 border shadow-sm">
            <AvatarImage src={tutor.image || undefined} />
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold">{tutor.name}</h1>
            <p className="text-muted-foreground">{tutor.email}</p>

            <div className="flex flex-wrap gap-3 items-center">
              <Badge className="text-sm">৳ {tutor.hourlyRate} / hr</Badge>

              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                {tutor.rating.toFixed(1)}
                <span className="text-muted-foreground">
                  ({tutor.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>About Tutor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {tutor.bio || 'No bio provided.'}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Subjects</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {subjects.map((s: any, i: number) => (
            <Badge key={i} variant="secondary" className="px-3 py-1">
              <BookOpen className="w-3 h-3 mr-1" />
              {s.name} • {s.category}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Available Slots</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2">
          {tutor.availability.map((slot: any) => (
            <Card key={slot.id} className="border rounded-xl">
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{slot.subjectName}</p>
                    <p className="text-sm text-muted-foreground">
                      {slot.categoryName}
                    </p>
                  </div>

                  <Badge variant={slot.isBooked ? 'destructive' : 'default'}>
                    {slot.isBooked ? 'Booked' : 'Available'}
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {new Date(slot.date).toDateString()}
                </div>

                <div className="text-sm">
                  {slot.startTime} — {slot.endTime}
                </div>
                <BookSessionButton
                  availabilityId={slot.id}
                  tutorId={slot.tutorId}
                  subjectId={slot.subjectId}
                  isBooked={slot.isBooked}
                  userRole={userInfo.role}
                />
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorProfileDetailsPage;
