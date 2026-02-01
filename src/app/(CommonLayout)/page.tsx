import { getAllTutors } from '@/actions/manage-tutor.action';
import { GetAllRatingPublic } from '@/actions/reviews.action';
import Carousel from '@/components/modules/homepage/Carousel';
import FeaturedTutors from '@/components/modules/homepage/FeaturedTutors';
import HowItWorks from '@/components/modules/homepage/HowItWorks';
import ReviewsCarousel from '@/components/modules/homepage/ReviewsSection';
import WhyChooseUs from '@/components/modules/homepage/WhyChooseUs';

const HomePage=async()=> {
    const { data } = await getAllTutors({
      limit: 8,
      page: 1,
    });
  const allTutors = data.data;
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
