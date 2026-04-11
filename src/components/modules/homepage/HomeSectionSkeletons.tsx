import { Skeleton } from '@/components/ui/skeleton';

export const FeaturedTutorsSkeleton = () => {
  return (
    <section
      id="featured-tutors"
      className="py-20 px-6 bg-linear-to-b from-background to-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <Skeleton className="h-10 w-64 mx-auto mb-3" />
          <Skeleton className="h-6 w-96 max-w-full mx-auto" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <article key={idx} className="rounded-xl border bg-background p-4">
              <Skeleton className="h-44 w-full rounded-lg" />
              <Skeleton className="h-6 w-2/3 mt-4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
              <Skeleton className="h-9 w-full mt-4" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ReviewsSkeleton = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <Skeleton className="h-10 w-64 mx-auto mb-12" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <article key={idx} className="rounded-xl border bg-background p-6">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-11/12 mb-2" />
            <Skeleton className="h-4 w-10/12" />
          </article>
        ))}
      </div>
    </section>
  );
};

export const NavbarSessionSkeleton = () => {
  return (
    <div className="h-16 flex items-center justify-between">
      <Skeleton className="h-8 w-36" />
      <div className="hidden lg:flex items-center gap-3">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
};
