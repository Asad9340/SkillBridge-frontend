import { getAllTutors } from '@/actions/manage-tutor.action';
import Carousel from '@/components/modules/homepage/Carousel';
import FeaturedTutors from '@/components/modules/homepage/FeaturedTutors';

const HomePage=async()=> {
  const { data: allTutors } =await getAllTutors();
  return (
    <div>
      <Carousel />
      <FeaturedTutors allTutors={allTutors} />
    </div>
  );
}

export default HomePage;
