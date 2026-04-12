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
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}) => {
  const {
    page = '1',
    search,
    category,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    sortOrder,
  } = await searchParams;

  // Fetch categories for dropdown
  const { data: categories } = await getAllCategories();

  // Build tutors query params
  const tutorParams: any = { page, limit: '8' };
  if (search?.trim()) tutorParams.search = search.trim();
  if (category && category !== 'all') tutorParams.category = category;
  if (minPrice) tutorParams.minPrice = minPrice;
  if (maxPrice) tutorParams.maxPrice = maxPrice;
  if (minRating) tutorParams.minRating = minRating;
  if (sortBy) tutorParams.sortBy = sortBy;
  if (sortOrder) tutorParams.sortOrder = sortOrder;

  // Fetch tutors
  const response = await tutorService.getAllTutors(tutorParams);
  const tutors = response.data?.data?.data || [];

  const pagination = response.data?.data?.meta || {
    limit: 8,
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

        <TutorFilters categories={categories || []} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {tutors.length === 0 ? (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No tutors found matching your filters. Try adjusting your search.
            </div>
          ) : (
            tutors.map((tutor: any) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))
          )}
        </div>

        <PaginationControls meta={pagination} />
      </div>
    </section>
  );
};

export default TutorPage;
