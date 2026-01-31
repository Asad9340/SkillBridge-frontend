// components/FeaturedTutors.tsx

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, ChevronRight, DollarSign } from 'lucide-react';

export interface ITutorProfile {
  id: string;
  userId: string;
  bio: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  image: string | null;
}

const FeaturedTutors = ({ allTutors }: { allTutors: ITutorProfile[] }) => {
  return (
    <section className="py-20 px-6 bg-linear-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">Top Tutors</h2>
          <p className="text-muted-foreground text-lg">
            Learn from highly rated tutors available now
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {allTutors.map(tutor => {
            const initials = tutor.name
              ?.split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase();

            return (
              <Card
                key={tutor.id}
                className="group rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl justify-between"
              >
                <CardHeader className="flex flex-col items-center text-center gap-4">
                  <Avatar className="h-24 w-24 border shadow-sm">
                    <AvatarImage src={tutor.image || undefined} />
                    <AvatarFallback className="text-xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold text-lg">{tutor.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tutor.bio || 'Professional tutor'}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">
                      {tutor.rating.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      ({tutor.totalReviews})
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {tutor.hourlyRate}/hr
                    </Badge>
                  </div>

                  <Link href={`/tutors/${tutor.userId}`}>
                    <Button className="w-full group">
                      View Profile
                      <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;
