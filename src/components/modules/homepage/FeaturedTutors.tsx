// components/FeaturedTutors.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, Clock, ChevronRight } from 'lucide-react';

const FeaturedTutors = () => {
  const tutors = [
    {
      name: 'Dr. Sarah Khan',
      subject: 'Mathematics',
      rating: 4.9,
      students: 247,
      availability: 'Live Now',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Ahmed Rahman',
      subject: 'Python Programming',
      rating: 5.0,
      students: 189,
      availability: 'Available Soon',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Fatima Ali',
      subject: 'English Literature',
      rating: 4.8,
      students: 312,
      availability: 'Live Now',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Dr. Karim Hossain',
      subject: 'Physics',
      rating: 4.9,
      students: 156,
      availability: 'Available Now',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face&auto=format&q=80',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-4">
            Top Tutors Right Now
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with our highest-rated tutors available for instant sessions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor, index) => (
            <div
              key={index}
              className="group bg-background/50 backdrop-blur-sm rounded-3xl p-8 border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:bg-background"
            >
              <div className="relative mb-6">
                <Image
                  src={tutor.image}
                  alt={tutor.name}
                  width={120}
                  height={120}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                  {tutor.availability}
                </div>
              </div>

              <h3 className="font-bold text-xl mb-2 leading-tight">{tutor.name}</h3>
              <p className="text-lg text-primary font-semibold mb-4">{tutor.subject}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-bold text-lg">{tutor.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{tutor.students}</span>
                </div>
              </div>

              <Link
                href="/tutors"
                className="group/inline flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                Book Now
                <ChevronRight className="w-4 h-4 group-hover/inline:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;
