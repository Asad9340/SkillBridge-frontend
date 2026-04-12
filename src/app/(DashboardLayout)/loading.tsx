import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-5 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Chart area skeleton */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border p-5 space-y-4">
          <Skeleton className="h-5 w-40" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-8" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border p-5 space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
}
