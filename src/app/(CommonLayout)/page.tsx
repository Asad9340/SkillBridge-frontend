
import { GetAllRatingPublic } from '@/actions/reviews.action';
import Carousel from '@/components/modules/homepage/Carousel';
import FeaturedTutors from '@/components/modules/homepage/FeaturedTutors';
import HowItWorks from '@/components/modules/homepage/HowItWorks';
import ReviewsCarousel from '@/components/modules/homepage/ReviewsSection';
import WhyChooseUs from '@/components/modules/homepage/WhyChooseUs';
import { tutorService } from '@/services/tutor.service';

const HomePage=async()=> {
    const response = await tutorService.getAllTutors({
      page: '1',
      limit: '8',
    });
  const allTutors = response.data?.data?.data || [];
  const { data: reviews } = await GetAllRatingPublic();
  return (
    <div>
      <Carousel />
      <FeaturedTutors allTutors={allTutors} />
      <WhyChooseUs />
      <HowItWorks />
      <ReviewsCarousel reviews={reviews} />;
    </div>
  );
}

export default HomePage;
