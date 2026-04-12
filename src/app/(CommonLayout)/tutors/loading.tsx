const TutorCardSkeleton = () => (
  <div className="rounded-xl border p-4 shadow-sm space-y-4 animate-pulse">
    <div className="h-40 rounded-md bg-muted" />
    <div className="space-y-2">
      <div className="h-5 w-2/3 rounded bg-muted" />
      <div className="h-4 w-full rounded bg-muted" />
      <div className="h-4 w-4/5 rounded bg-muted" />
    </div>
    <div className="h-10 w-full rounded-md bg-muted" />
  </div>
);

const TutorsLoading = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="mx-auto h-10 w-56 rounded bg-muted animate-pulse" />
          <div className="mx-auto h-5 w-96 max-w-full rounded bg-muted animate-pulse" />
        </div>

        <div className="rounded-xl border p-4 animate-pulse">
          <div className="h-10 w-full rounded bg-muted" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <TutorCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorsLoading;
