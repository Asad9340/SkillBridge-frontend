import { tutorService } from '@/services/tutor.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

const ManagerManageTutorsPage = async () => {
  const { data } = await tutorService.getAllTutors(
    { limit: '50' },
    { cache: 'no-store' },
  );
  const tutors = data?.data?.data ?? [];

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tutor Oversight</h1>
        <p className="text-sm text-muted-foreground">
          Monitor tutor activity and availability quality across the platform.
        </p>
      </div>

      {tutors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No tutor data available right now.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor: any) => (
            <Card key={tutor.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="truncate text-base">
                  {tutor.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="truncate text-muted-foreground">{tutor.email}</p>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="secondary">
                    Reviews: {tutor.totalReviews ?? 0}
                  </Badge>
                  <span className="font-semibold">
                    ৳ {tutor.hourlyRate ?? 0}/hr
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerManageTutorsPage;
