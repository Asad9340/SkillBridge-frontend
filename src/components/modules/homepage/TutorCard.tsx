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
  name: string;
  email: string;
  image: string | null;
}

interface Props {
  tutor: ITutorProfile;
}

const TutorCard = ({ tutor }: Props) => {
  const initials = tutor.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="group rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl justify-between">
      <CardHeader className="flex flex-col items-center text-center gap-4">
        <Avatar className="h-24 w-24 border shadow-sm">
          <AvatarImage src={tutor.image || undefined} />
          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-semibold text-lg">{tutor.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tutor.bio || 'Professional tutor'}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Rating */}
        <div className="flex items-center justify-center gap-2">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span className="font-semibold">
            {tutor.rating?.toFixed(1) || '0.0'}
          </span>
          <span className="text-muted-foreground text-sm">
            ({tutor.totalReviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <DollarSign className="w-3 h-3 mr-1" />
            {tutor.hourlyRate}/hr
          </Badge>
        </div>

        {/* Profile */}
        <Link href={`/tutors/${tutor.userId}`}>
          <Button className="w-full group">
            View Profile
            <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TutorCard;
