/* eslint-disable @typescript-eslint/no-explicit-any */
import TutorCard from '@/components/modules/homepage/TutorCard';
import TutorFilters from '@/components/modules/homepage/TutorFilters';
import PaginationControls from '@/components/modules/homepage/PaginationControl';
import { tutorService } from '@/services/tutor.service';
import { getAllCategories } from '@/actions/manage-categories.action';

const TutorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}) => {
  const { page = '1', search, category } = await searchParams;

  // Fetch categories for dropdown
  const { data: categories } = await getAllCategories();

  // Build tutors query params
  const tutorParams: any = {
    page,
    limit: '8',
  };

  // Pass search and category filters to the service
  if (search && search.trim()) {
    tutorParams.subject = search; // Map search to subject parameter
  }
  if (category && category !== 'all') {
    tutorParams.category = category;
  }

  // Fetch tutors
  const response = await tutorService.getAllTutors(tutorParams);
  const tutors = response.data?.data?.data || [];

  const pagination = response.data?.data?.meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3">All Tutors</h1>
          <p className="text-muted-foreground text-lg">
            Browse and search tutors by subject, rating, or price, and filter by
            category
          </p>
        </div>

        {/* Pass categories to filter component */}
        <TutorFilters categories={categories || []} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {tutors.map((tutor: any) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>

        <PaginationControls meta={pagination} />
      </div>
    </section>
  );
};

export default TutorPage;
