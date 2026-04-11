import { Suspense } from 'react';
import { GetAllRatingPublic } from '@/actions/reviews.action';
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
      <LandingExtraSections />
    </div>
  );
};

export default HomePage;
