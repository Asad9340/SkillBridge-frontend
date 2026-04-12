import { Suspense } from 'react';
import { GetAllRatingPublic } from '@/actions/reviews.action';
import { getAllCategories } from '@/actions/manage-categories.action';
import Carousel from '@/components/modules/homepage/Carousel';
import FeaturedTutors from '@/components/modules/homepage/FeaturedTutors';
import {
  FeaturedTutorsSkeleton,
  ReviewsSkeleton,
} from '@/components/modules/homepage/HomeSectionSkeletons';
import HowItWorks from '@/components/modules/homepage/HowItWorks';
import LandingExtraSections from '@/components/modules/homepage/LandingExtraSections';
import ReviewsCarousel from '@/components/modules/homepage/ReviewsSection';
import WhyChooseUs from '@/components/modules/homepage/WhyChooseUs';
import { tutorService } from '@/services/tutor.service';

const FeaturedTutorsSection = async () => {
  const response = await tutorService.getAllTutors({
    page: '1',
    limit: '8',
  });
  const allTutors = response.data?.data?.data || [];

  return <FeaturedTutors allTutors={allTutors} />;
};

const ReviewsSection = async () => {
  const { data: reviews } = await GetAllRatingPublic();

  return <ReviewsCarousel reviews={reviews || []} />;
};

const StatsSection = async () => {
  // Use public endpoints only (no auth required)
  const [tutorsRes, reviewsRes, categoriesRes] = await Promise.allSettled([
    tutorService.getAllTutors({ page: '1', limit: '100' }),
    GetAllRatingPublic(),
    getAllCategories(),
  ]);

  const totalTutors =
    tutorsRes.status === 'fulfilled'
      ? (tutorsRes.value.data?.data?.meta?.total ?? 0)
      : 0;

  const tutorsData: Array<{ subjects?: string[] }> =
    tutorsRes.status === 'fulfilled'
      ? ((tutorsRes.value.data?.data?.data ?? []) as Array<{
          subjects?: string[];
        }>)
      : [];

  const reviewsData: Array<{ rating?: number }> =
    reviewsRes.status === 'fulfilled'
      ? ((reviewsRes.value.data ?? []) as Array<{ rating?: number }>)
      : [];

  const totalReviews = reviewsData.length;

  const averageRating =
    totalReviews > 0
      ? reviewsData.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) /
        totalReviews
      : 0;

  const uniqueSubjects = new Set(
    tutorsData.flatMap(tutor => tutor.subjects ?? []),
  ).size;

  const categories: string[] =
    categoriesRes.status === 'fulfilled'
      ? ((categoriesRes.value.data ?? []) as { name: string }[]).map(
          (c: { name: string }) => c.name,
        )
      : [];

  const liveStats = [
    {
      label: 'Active Tutors',
      value: totalTutors.toString(),
    },
    {
      label: 'Subjects Covered',
      value: uniqueSubjects.toString(),
    },
    {
      label: 'Student Reviews',
      value: totalReviews.toString(),
    },
    {
      label: 'Average Rating',
      value: totalReviews > 0 ? `${averageRating.toFixed(1)}/5` : '0.0/5',
    },
  ];

  return (
    <LandingExtraSections liveStats={liveStats} liveCategories={categories} />
  );
};

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <Suspense fallback={<FeaturedTutorsSkeleton />}>
        <FeaturedTutorsSection />
      </Suspense>
      <WhyChooseUs />
      <HowItWorks />
      <Suspense fallback={<ReviewsSkeleton />}>
        <ReviewsSection />
      </Suspense>
      <Suspense fallback={null}>
        <StatsSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
