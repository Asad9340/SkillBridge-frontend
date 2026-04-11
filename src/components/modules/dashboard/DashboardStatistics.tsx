import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatItem = {
  label: string;
  value: number;
};

const COLORS = ['#2563eb', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6'];

export const DashboardStatistics = ({
  title,
  subtitle,
  barStats,
  pieStats,
}: {
  title: string;
  subtitle: string;
  barStats: StatItem[];
  pieStats: StatItem[];
}) => {
  const safeBarStats = barStats.map(item => ({
    ...item,
    value: Number.isFinite(item.value) ? item.value : 0,
  }));

  const safePieStats = pieStats.map(item => ({
    ...item,
    value: Number.isFinite(item.value) ? item.value : 0,
  }));

  const maxBarValue = Math.max(...safeBarStats.map(item => item.value), 1);
  const pieTotal = safePieStats.reduce((sum, item) => sum + item.value, 0);

  const hasBarData = safeBarStats.length > 0;
  const linePointList = safeBarStats.map((item, index) => {
    const x =
      safeBarStats.length === 1
        ? 50
        : (index / (safeBarStats.length - 1)) * 100;
    const y = 36 - (item.value / maxBarValue) * 28;
    return `${x},${y}`;
  });

  const linePoints = linePointList.join(' ');

  const gradientStops = safePieStats.reduce(
    (acc, item, index) => {
      const part = pieTotal > 0 ? (item.value / pieTotal) * 100 : 0;
      const start = acc.current;
      const end = start + part;
      acc.stops.push(`${COLORS[index % COLORS.length]} ${start}% ${end}%`);
      return { stops: acc.stops, current: end };
    },
    { stops: [] as string[], current: 0 },
  ).stops;

  const pieGradient =
    pieTotal > 0
      ? `conic-gradient(${gradientStops.join(', ')})`
      : 'conic-gradient(#94a3b8 0% 100%)';

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {!safeBarStats.length && !safePieStats.length ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            No statistics available right now.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Bar Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {safeBarStats.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bar data.</p>
            ) : null}

            {safeBarStats.map(item => {
              const width = (item.value / maxBarValue) * 100;
              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="max-w-[70%] truncate">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${Math.max(width, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Line Trend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <svg viewBox="0 0 100 40" className="h-40 w-full">
              <line
                x1="0"
                y1="36"
                x2="100"
                y2="36"
                stroke="currentColor"
                strokeOpacity="0.25"
              />
              {hasBarData ? (
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  points={linePoints}
                />
              ) : null}
              {linePointList.map((point, index) => {
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
            {!hasBarData ? (
              <p className="text-sm text-muted-foreground">No line data.</p>
            ) : null}
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground sm:grid-cols-4">
              {safeBarStats.slice(0, 4).map(item => (
                <div key={item.label} className="rounded-md bg-muted/40 p-2">
                  <p className="truncate">{item.label}</p>
                  <p className="font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Pie Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="mx-auto h-40 w-40 rounded-full"
              style={{ background: pieGradient }}
            >
              <div className="m-6 flex h-28 w-28 items-center justify-center rounded-full bg-background text-sm font-semibold">
                {pieTotal}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {safePieStats.length === 0 ? (
                <p className="text-sm text-muted-foreground">No pie data.</p>
              ) : null}
              {safePieStats.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="max-w-45 truncate">{item.label}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
