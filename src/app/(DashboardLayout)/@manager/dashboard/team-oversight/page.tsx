import { getAllUsersByAdmin } from '@/actions/manage-users.action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

const TeamOversightPage = async () => {
  const { data } = await getAllUsersByAdmin();
  const users = Array.isArray(data)
    ? (data as Array<{ status?: string | null }>)
    : [];

  const total = users.length;
  const active = users.filter(user => user.status === 'ACTIVE').length;
  const suspended = users.filter(user => user.status === 'SUSPENDED').length;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-bold">Team Oversight</h1>

      <div className="grid sm:grid-cols-3 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Total Team Members</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{total}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{active}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suspended</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{suspended}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamOversightPage;
