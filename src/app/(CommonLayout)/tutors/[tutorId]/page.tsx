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
  DollarSign,
  Award,
  Users,
  Mail,
} from 'lucide-react';
import BookSessionButton from '@/components/modules/tutor/BookSessionButton';
import TutorCard from '@/components/modules/homepage/TutorCard';
import TutorDetailsActions from '@/components/modules/tutor/TutorDetailsActions';
import { getSessionUser } from '@/lib/getSessionUser';

const TutorProfileDetailsPage = async ({
  params,
}: {
  params: Promise<{ tutorId: string }>;
}) => {
  const sessionUser = await getSessionUser();
  const userRole = sessionUser?.role || 'GUEST';

  const { tutorId } = await params;
  const { data: tutor } = await tutorService.getTutorProfile(tutorId);

  if (!tutor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Tutor Not Found</h2>
          <p className="text-muted-foreground">
            This profile does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const subjectMap = new Map<string, { name: string; category: string }>(
    tutor.availability.map((a: any) => [
      a.subjectId,
      { name: a.subjectName, category: a.categoryName },
    ]),
  );
  const subjects = [...subjectMap.values()];

  const firstCategory = subjects[0]?.category;
  let relatedTutors: any[] = [];

  if (firstCategory) {
    const relatedByCategory = await tutorService.getAllTutors({
      category: firstCategory,
      limit: '6',
    });
    relatedTutors =
      relatedByCategory.data?.data?.data?.filter(
        (t: any) => t.userId !== tutorId,
      ) || [];
  }

  if (!relatedTutors.length) {
    const fallbackRelated = await tutorService.getAllTutors({ limit: '6' });
    relatedTutors =
      fallbackRelated.data?.data?.data?.filter(
        (t: any) => t.userId !== tutorId,
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
  const bookedSlots = tutor.availability?.filter((slot: any) => slot.isBooked);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      <TutorDetailsActions
        tutorId={tutorId}
        tutorName={tutor.name}
        hasAvailableSlot={availableSlots.length > 0}
        isLoggedIn={Boolean(sessionUser)}
        userRole={userRole}
      />

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-background border shadow-sm">
        <div className="p-8 md:p-10">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {/* Avatar */}
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl shrink-0">
              <AvatarImage src={tutor.image || undefined} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 space-y-3 min-w-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {tutor.name}
                </h1>
                <p className="text-muted-foreground flex items-center gap-1.5 mt-1">
                  <Mail className="w-4 h-4" />
                  {tutor.email}
                </p>
              </div>

              {/* Rating + price row */}
              <div className="flex flex-wrap gap-3 items-center">
                <Badge
                  variant="secondary"
                  className="text-base px-4 py-1.5 gap-1.5"
                >
                  <DollarSign className="w-4 h-4" />৳ {tutor.hourlyRate} / hr
                </Badge>

                <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">
                    {tutor.rating.toFixed(1)}
                  </span>
                  <span className="text-sm opacity-80">
                    ({tutor.totalReviews} reviews)
                  </span>
                </div>
              </div>

              {/* Subject chips */}
              {subjects.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s: any, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {s.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: DollarSign,
            label: 'Hourly Rate',
            value: `৳${tutor.hourlyRate}`,
          },
          {
            icon: Star,
            label: 'Rating',
            value: `${tutor.rating.toFixed(1)} / 5`,
          },
          { icon: Users, label: 'Reviews', value: tutor.totalReviews },
          {
            icon: BookOpen,
            label: 'Subjects',
            value: subjects.length,
          },
        ].map(stat => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card p-4 text-center space-y-1 shadow-sm"
          >
            <stat.icon className="w-5 h-5 mx-auto text-primary" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* About */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            About {tutor.name.split(' ')[0]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed text-[15px]">
            {tutor.bio || 'This tutor has not yet added a bio.'}
          </p>
        </CardContent>
      </Card>

      {/* Subjects taught */}
      {subjects.length > 0 && (
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Subjects Taught
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {subjects.map((s: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-full border bg-muted/40 px-4 py-2 text-sm"
                >
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground text-xs">
                    {s.category}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Rules */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Booking Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-2.5 rounded-xl border p-4 bg-muted/20">
              <ShieldCheck className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <p>Sessions can only be booked through available slots.</p>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl border p-4 bg-muted/20">
              <CalendarDays className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <p>You need a student account to confirm a booking.</p>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl border p-4 bg-muted/20">
              <Shapes className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <p>
                Each slot becomes unavailable immediately after it is booked.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Slots */}
      <Card id="available-slots" className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Available Slots
            {availableSlots.length > 0 && (
              <Badge className="ml-2">{availableSlots.length} open</Badge>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {availableSlots.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No available slots at the moment. Check back soon.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {availableSlots.map((slot: any) => (
                <div
                  key={slot.id}
                  className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold">{slot.subjectName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {slot.categoryName}
                      </p>
                    </div>
                    <Badge className="shrink-0">Available</Badge>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(slot.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {slot.startTime} — {slot.endTime}
                  </div>

                  <BookSessionButton
                    availabilityId={slot.id}
                    tutorId={slot.tutorId}
                    subjectId={slot.subjectId}
                    isBooked={slot.isBooked}
                    userRole={userRole}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Booked slots (collapsed / secondary view) */}
          {bookedSlots.length > 0 && (
            <details className="mt-2">
              <summary className="text-sm text-muted-foreground cursor-pointer py-2 select-none hover:text-foreground transition-colors">
                Show {bookedSlots.length} already booked slot
                {bookedSlots.length > 1 ? 's' : ''}
              </summary>
              <div className="grid gap-3 md:grid-cols-2 mt-3">
                {bookedSlots.map((slot: any) => (
                  <div
                    key={slot.id}
                    className="rounded-xl border bg-muted/30 p-4 space-y-2 opacity-60"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-medium text-sm">{slot.subjectName}</p>
                      <Badge variant="destructive" className="text-xs shrink-0">
                        Booked
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="w-3 h-3" />
                      {new Date(slot.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                      <Clock className="w-3 h-3 ml-1" />
                      {slot.startTime}–{slot.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Student Reviews
            {tutor.reviews?.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {tutor.reviews.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {tutor.reviews?.length ? (
            tutor.reviews.map((review: any, index: number) => {
              const reviewerInitials = review.reviewerName
                ?.split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase();

              return (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl border p-4 hover:bg-muted/20 transition-colors"
                >
                  <Avatar className="h-11 w-11 border shrink-0">
                    <AvatarImage src={review.reviewerImage || undefined} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                      {reviewerInitials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm">
                        {review.reviewerName}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-yellow-500 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {review.review || 'No comment provided.'}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Star className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>No reviews yet. Be the first to book a session!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Related Tutors */}
      {relatedTutors.length > 0 && (
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Other Tutors You May Like
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedTutors.slice(0, 3).map((relatedTutor: any) => (
                <TutorCard key={relatedTutor.id} tutor={relatedTutor} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TutorProfileDetailsPage;
