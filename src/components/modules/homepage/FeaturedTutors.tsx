import TutorCard, { ITutorProfile } from './TutorCard';

const FeaturedTutors = ({ allTutors }: { allTutors: ITutorProfile[] }) => {
  return (
    <section
      id="featured-tutors"
      className="py-20 px-6 bg-linear-to-b from-background to-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">Top Tutors</h2>
          <p className="text-muted-foreground text-lg">
            Learn from highly rated tutors available now
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {allTutors?.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;
