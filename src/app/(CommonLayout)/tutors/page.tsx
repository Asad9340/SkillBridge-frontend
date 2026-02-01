/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTutors } from '@/actions/manage-tutor.action';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TutorCard from '@/components/modules/homepage/TutorCard';

interface PageProps {
  searchParams: {
    page?: string;
  };
}

const TutorPage = async ({ searchParams }: PageProps) => {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 10;

  const { data, meta } = await getAllTutors({
    page: currentPage,
    limit,
  });

  const tutors = data.data || [];
  const totalPage = meta?.totalPage || 1;

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold mb-3">All Tutors</h1>
          <p className="text-muted-foreground text-lg">
            Find the best tutor for your learning journey
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tutors.map((tutor:any) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>

        <div className="flex justify-center mt-14 gap-2 flex-wrap">
          <Link
            href={`?page=${currentPage - 1}`}
            aria-disabled={currentPage <= 1}
          >
            <Button variant="outline" disabled={currentPage <= 1}>
              Previous
            </Button>
          </Link>

          {Array.from({ length: totalPage }).map((_, i) => {
            const page = i + 1;

            return (
              <Link key={page} href={`?page=${page}`}>
                <Button variant={page === currentPage ? 'default' : 'outline'}>
                  {page}
                </Button>
              </Link>
            );
          })}

          <Link
            href={`?page=${currentPage + 1}`}
            aria-disabled={currentPage >= totalPage}
          >
            <Button variant="outline" disabled={currentPage >= totalPage}>
              Next
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TutorPage;
