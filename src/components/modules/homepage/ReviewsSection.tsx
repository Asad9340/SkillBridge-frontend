'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useRef } from 'react';

interface Review {
  id: string;
  rating: number;
  comment: string;
  student: {
    name: string;
    email: string;
    image?: string;
  };
}

interface Props {
  reviews: Review[];
}

const ReviewsCarousel = ({ reviews }: Props) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.offsetWidth / 2;
    carouselRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-gray-100">
        Student Reviews
      </h2>

      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 scroll-smooth scrollbar-hide"
        >
          {reviews.map(review => (
            <div
              key={review.id}
              className="flex-none w-80 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-gray-800 transition"
            >
              <div className="flex items-center mb-4">
                {review.student.image ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={review.student.image}
                      alt={review.student.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-4"></div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {review.student.name}
                  </p>
                  <div className="flex items-center text-yellow-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {review.comment}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('left')}
          className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          ‹
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
