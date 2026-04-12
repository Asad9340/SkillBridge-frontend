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
    tutorService.getAllTutors({ page: '1', limit: '1' }),
    GetAllRatingPublic(),
    getAllCategories(),
  ]);

  const totalTutors =
    tutorsRes.status === 'fulfilled'
      ? (tutorsRes.value.data?.data?.meta?.total ?? 0)
      : 0;

  const totalReviews =
    reviewsRes.status === 'fulfilled'
      ? (reviewsRes.value.data?.length ?? 0)
      : 0;

  const categories: string[] =
    categoriesRes.status === 'fulfilled'
      ? ((categoriesRes.value.data ?? []) as { name: string }[]).map(
          (c: { name: string }) => c.name,
        )
      : [];

  const liveStats = [
    {
      label: 'Active Tutors',
      value: totalTutors > 0 ? `${totalTutors}+` : '100+',
    },
    {
      label: 'Subjects Covered',
      value: '85+',
    },
    {
      label: 'Student Reviews',
      value: totalReviews > 0 ? `${totalReviews}+` : '500+',
    },
    { label: 'Average Rating', value: '4.9/5' },
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
