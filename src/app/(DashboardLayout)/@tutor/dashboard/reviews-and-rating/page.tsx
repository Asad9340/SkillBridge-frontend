/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllReviewByTutorId } from '@/actions/reviews.action';
import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const ReviewsAndRatingPage = async () => {
  const { data: sessionData } = await userService.getSession();
  const userInfo = sessionData.user;

  const { data: tutorData } = await tutorService.getTutorProfile(userInfo.id);
  const { data: reviews } = await getAllReviewByTutorId(tutorData.id);

  if (!reviews?.length) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-2">No Reviews Yet</h2>
        <p className="text-muted-foreground">
          Your students have not submitted any reviews yet.
        </p>
      </div>
    );
  }

  const averageRating =
    reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviews.length;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* ===== Summary Section ===== */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Ratings Overview</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-4xl font-bold">{averageRating.toFixed(1)}</p>
            <div className="mt-1">{renderStars(Math.round(averageRating))}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Based on {reviews.length} reviews
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review: any) => (
          <Card
            key={review.id}
            className="rounded-2xl shadow-sm hover:shadow-lg transition"
          >
            <CardHeader className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarImage src={review.student.image} />
                <AvatarFallback>
                  {review.student.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold">{review.student.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {renderStars(review.rating)}

              <p className="text-sm text-muted-foreground">
                {review.comment || 'No comment provided'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsAndRatingPage;
