import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BookingSummary = {
  totalBookings: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
};

type DashboardAnalytics = {
  bookingSummary?: BookingSummary;
  totalTutors?: number;
  totalStudents?: number;
  totalUsers?: number;
  roleSummary?: {
    totalAdmins?: number;
    totalManagers?: number;
    totalOrganizers?: number;
    totalSuperAdmins?: number;
  };
};

type AdminAIInsights = {
  anomalyFlags?: string[];
  aiInsights?: string;
  trendSeries?: Array<{ date: string; count: number }>;
};

type DashboardUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  status?: string | null;
  updatedAt?: string | Date | null;
};

const BOOKING_COLORS: Record<string, string> = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  completed: '#10b981',
  cancelled: '#ef4444',
};

const ROLE_COLORS = [
  '#2563eb',
  '#14b8a6',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#22c55e',
  '#ec4899',
];

const toCount = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;

const toDate = (value: string | Date | null | undefined) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const buildLastSixMonthSeries = (users: DashboardUser[]) => {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleString('en-US', { month: 'short' });
    return { key, label, value: 0 };
  });

  const monthMap = new Map(months.map(m => [m.key, m]));

  for (const user of users) {
    const d = toDate(user.updatedAt);
    if (!d) continue;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const bucket = monthMap.get(key);
    if (bucket) {
      bucket.value += 1;
    }
  }

  return months;
};

const buildLinePoints = (series: Array<{ value: number }>) => {
  const max = Math.max(...series.map(s => s.value), 1);
  return series
    .map((item, index) => {
      const x = series.length === 1 ? 50 : (index / (series.length - 1)) * 100;
      const y = 36 - (item.value / max) * 28;
      return `${x},${y}`;
    })
    .join(' ');
};

export const AdvancedDashboardHome = ({
  title,
  analytics,
  users,
  aiInsights,
}: {
  title: string;
  analytics: DashboardAnalytics | null | undefined;
  users: DashboardUser[];
  aiInsights?: AdminAIInsights | null;
}) => {
  const booking = analytics?.bookingSummary;
  const bookingData = [
    { label: 'Pending', key: 'pending', value: toCount(booking?.pending) },
    {
      label: 'Confirmed',
      key: 'confirmed',
      value: toCount(booking?.confirmed),
    },
    {
      label: 'Completed',
      key: 'completed',
      value: toCount(booking?.completed),
    },
    {
      label: 'Cancelled',
      key: 'cancelled',
      value: toCount(booking?.cancelled),
    },
  ];
  const maxBookingValue = Math.max(...bookingData.map(item => item.value), 1);

  const roleCountMap = users.reduce((acc: Record<string, number>, user) => {
    const role = user.role ?? 'UNKNOWN';
    acc[role] = (acc[role] ?? 0) + 1;
    return acc;
  }, {});

  const roleEntries = Object.entries(roleCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const totalRoles = roleEntries.reduce((sum, [, count]) => sum + count, 0);
  const donutSegments = roleEntries.reduce<
    Array<{
      role: string;
      count: number;
      color: string;
      start: number;
      end: number;
    }>
  >((acc, [role, count], index) => {
    const percentage = totalRoles > 0 ? (count / totalRoles) * 100 : 0;
    const start = acc.length > 0 ? acc[acc.length - 1].end : 0;
    acc.push({
      role,
      count,
      color: ROLE_COLORS[index % ROLE_COLORS.length],
      start,
      end: start + percentage,
    });
    return acc;
  }, []);

  const donutGradient =
    donutSegments.length > 0
      ? `conic-gradient(${donutSegments
          .map(seg => `${seg.color} ${seg.start}% ${seg.end}%`)
          .join(', ')})`
      : 'conic-gradient(#94a3b8 0% 100%)';

  const userActivitySeries = buildLastSixMonthSeries(users);
  const linePoints = buildLinePoints(userActivitySeries);

  const recentUsers = [...users]
    .sort((a, b) => {
      const aTime = toDate(a.updatedAt)?.getTime() ?? 0;
      const bTime = toDate(b.updatedAt)?.getTime() ?? 0;
      return bTime - aTime;
    })
    .slice(0, 8);

  const overview = [
    {
      label: 'Total Users',
      value: toCount(analytics?.totalUsers) || users.length,
    },
    { label: 'Total Tutors', value: toCount(analytics?.totalTutors) },
    { label: 'Total Students', value: toCount(analytics?.totalStudents) },
    { label: 'Total Bookings', value: toCount(booking?.totalBookings) },
  ];

  const aiMarkdown =
    aiInsights?.aiInsights?.trim() || 'AI insights are currently unavailable.';
  const aiLines = aiMarkdown.split('\n').filter(line => line.trim().length > 0);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">
          Real-time overview powered by backend analytics and entity APIs.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {overview.map(item => (
          <Card key={item.label}>
            <CardHeader>
              <CardTitle className="text-base">{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {item.value}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking Status Bar Chart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookingData.map(item => {
              const width = (item.value / maxBookingValue) * 100;
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${Math.max(width, 6)}%`,
                        backgroundColor: BOOKING_COLORS[item.key],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <svg viewBox="0 0 100 40" className="h-40 w-full">
                <line
                  x1="0"
                  y1="36"
                  x2="100"
                  y2="36"
                  stroke="currentColor"
                  strokeOpacity="0.25"
                />
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  points={linePoints}
                />
                {linePoints.split(' ').map((point, index) => {
                  const [x, y] = point.split(',');
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="1.2"
                      fill="currentColor"
                    />
                  );
                })}
              </svg>
              <div className="grid grid-cols-6 text-center text-xs text-muted-foreground">
                {userActivitySeries.map(point => (
                  <div key={point.label}>
                    <div>{point.label}</div>
                    <div className="font-medium text-foreground">
                      {point.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Role Distribution Donut Chart</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div
              className="h-40 w-40 rounded-full"
              style={{ background: donutGradient }}
            >
              <div className="m-6 flex h-28 w-28 items-center justify-center rounded-full bg-background text-sm font-semibold">
                {totalRoles}
              </div>
            </div>
            <div className="w-full space-y-2 text-sm">
              {donutSegments.map(segment => (
                <div
                  key={segment.role}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span>{segment.role}</span>
                  </div>
                  <span className="font-medium">{segment.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Dynamic User Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 pr-3">Name</th>
                    <th className="py-2 pr-3">Email</th>
                    <th className="py-2 pr-3">Role</th>
                    <th className="py-2 pr-3">Status</th>
                    <th className="py-2">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr key={user.id} className="border-b last:border-b-0">
                      <td className="py-2 pr-3 font-medium">
                        {user.name ?? 'N/A'}
                      </td>
                      <td className="py-2 pr-3">{user.email ?? 'N/A'}</td>
                      <td className="py-2 pr-3">{user.role ?? 'N/A'}</td>
                      <td className="py-2 pr-3">{user.status ?? 'N/A'}</td>
                      <td className="py-2">
                        {toDate(user.updatedAt)?.toLocaleDateString() ?? 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Anomaly Insights & Suggested Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiInsights?.anomalyFlags?.length ? (
            <div className="space-y-1">
              {aiInsights.anomalyFlags.map(flag => (
                <p key={flag} className="text-sm text-foreground">
                  - {flag}
                </p>
              ))}
            </div>
          ) : null}

          <div className="rounded-md border bg-muted/30 p-3">
            {aiLines.map((line, index) => (
              <p key={`${index}-${line}`} className="text-sm leading-6">
                {line}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
