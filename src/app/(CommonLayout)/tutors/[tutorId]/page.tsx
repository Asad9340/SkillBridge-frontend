/* eslint-disable @typescript-eslint/no-explicit-any */
import { tutorService } from '@/services/tutor.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  Clock,
  BookOpen,
  CalendarDays,
  ShieldCheck,
  Shapes,
} from 'lucide-react';
import BookSessionButton from '@/components/modules/tutor/BookSessionButton';
import TutorCard from '@/components/modules/homepage/TutorCard';
import TutorDetailsActions from '@/components/modules/tutor/TutorDetailsActions';
import { userService } from '@/services/user.service';
import Image from 'next/image';

const TutorProfileDetailsPage = async ({
  params,
}: {
  params: Promise<{ tutorId: string }>;
}) => {
  const { data: sessionData } = await userService.getSession();
  const userRole = sessionData?.user?.role || 'GUEST';

  const { tutorId } = await params;
  const { data: tutor } = await tutorService.getTutorProfile(tutorId);

  if (!tutor) {
    return <div className="p-10 text-center">Tutor not found</div>;
  }

  const subjectMap = new Map<string, { name: string; category: string }>(
    tutor.availability.map((a: any) => [
      a.subjectId,
      { name: a.subjectName, category: a.categoryName },
    ]),
  );
  const subjects = [...subjectMap.values()];

  const media = Array.from(
    new Set([
      tutor.image,
      ...tutor.reviews
        ?.map((review: any) => review.reviewerImage)
        .filter((image: string | null) => Boolean(image)),
    ]),
  ).filter(Boolean) as string[];

  const mediaList = media.length ? media : ['/next.svg', '/globe.svg'];

  const firstCategory = subjects[0]?.category;
  let relatedTutors: any[] = [];

  if (firstCategory) {
    const relatedByCategory = await tutorService.getAllTutors({
      category: firstCategory,
      limit: '6',
    });

    relatedTutors =
      relatedByCategory.data?.data?.data?.filter(
        (relatedTutor: any) => relatedTutor.userId !== tutorId,
      ) || [];
  }

  if (!relatedTutors.length) {
    const fallbackRelated = await tutorService.getAllTutors({
      limit: '6',
    });

    relatedTutors =
      fallbackRelated.data?.data?.data?.filter(
        (relatedTutor: any) => relatedTutor.userId !== tutorId,
      ) || [];
  }

  const initials = tutor.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  const availableSlots = tutor.availability?.filter(
    (slot: any) => !slot.isBooked,
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <TutorDetailsActions
        tutorId={tutorId}
        tutorName={tutor.name}
        hasAvailableSlot={availableSlots.length > 0}
        isLoggedIn={Boolean(sessionData?.user)}
        userRole={userRole}
      />

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
          <CardTitle>Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {mediaList.slice(0, 3).map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative aspect-video overflow-hidden rounded-xl border bg-muted"
              >
                <Image
                  src={image}
                  alt={`${tutor.name} media ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Overview / Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {tutor.bio || 'No bio provided.'}
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Key Information / Specifications / Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">Hourly Rate</p>
              <p className="text-lg font-semibold">
                ৳ {tutor.hourlyRate} / hour
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">Average Rating</p>
              <p className="text-lg font-semibold">
                {tutor.rating.toFixed(1)} / 5
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">Total Reviews</p>
              <p className="text-lg font-semibold">{tutor.totalReviews}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground">Subject Coverage</p>
              <p className="text-lg font-semibold">
                {subjects.length} subjects
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Booking Rules</h3>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 mt-0.5" />
                Sessions can be booked only from available slots.
              </p>
              <p className="flex items-start gap-2">
                <CalendarDays className="h-4 w-4 mt-0.5" />
                Students need an account to confirm bookings.
              </p>
              <p className="flex items-start gap-2">
                <Shapes className="h-4 w-4 mt-0.5" />
                Each slot is unique and becomes unavailable after booking.
              </p>
            </div>
          </div>
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

      <Card id="available-slots" className="rounded-2xl">
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
                  userRole={userRole}
                />
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Rating / Reviews / Feedback</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {tutor.reviews?.length ? (
            tutor.reviews.map((review: any, index: number) => {
              const reviewerInitials = review.reviewerName
                ?.split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase();

              return (
                <div key={index} className="flex gap-4 border rounded-md p-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={review.reviewerImage || undefined} />
                    <AvatarFallback>{reviewerInitials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{review.reviewerName}</p>

                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {review.rating}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm">
                      {review.review || 'No comment provided'}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground">No reviews yet.</p>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Related / Suggested Tutors</CardTitle>
        </CardHeader>
        <CardContent>
          {relatedTutors.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedTutors.slice(0, 3).map((relatedTutor: any) => (
                <TutorCard key={relatedTutor.id} tutor={relatedTutor} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No related tutors found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorProfileDetailsPage;
