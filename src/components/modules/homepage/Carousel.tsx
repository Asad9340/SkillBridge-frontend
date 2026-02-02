'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Find Expert Tutors',
    description:
      'Browse verified tutor profiles, check real-time availability, and book sessions instantly.',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Browse Tutors',
    ctaLink: '/tutors',
  },
  {
    id: 2,
    title: 'Instant Booking',
    description:
      'View live availability calendars and secure your 1-on-1 session in just seconds.',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
    ctaText: 'Book Now',
    ctaLink: '/tutors',
  },
  {
    id: 3,
    title: 'Tutor Dashboard',
    description:
      'Manage your schedule, track student bookings, view earnings, and update your profile.',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    ctaText: 'View Dashboard',
    ctaLink: '/tutor/dashboard',
  },
  {
    id: 4,
    title: 'Smart Matching',
    description:
      'Our algorithm connects you with the perfect tutor based on skills, availability, and ratings.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    ctaText: 'Find Match',
    ctaLink: '/tutors',
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-3xl shadow-2xl">
      <div className="absolute inset-0 rounded-3xl">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 rounded-3xl transition-all duration-700 ease-in-out shadow-2xl',
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full',
            )}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-top brightness-75 rounded-3xl"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/20 rounded-3xl" />
            <div className="absolute right-6 md:right-12 bottom-8 md:bottom-12 max-w-sm bg-black/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight mb-4">
                {slide.title}
              </h1>
              <p className="text-base md:text-lg text-white/95 drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] mb-6 leading-relaxed">
                {slide.description}
              </p>
              <Link
                href={slide.ctaLink}
                className="group inline-flex items-center gap-2 bg-white text-black dark:bg-gray-800 dark:text-white px-6 py-3 rounded-2xl font-semibold text-sm md:text-base shadow-2xl hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 border border-white/40 dark:border-gray-600 drop-shadow-xl"
              >
                {slide.ctaText}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40 backdrop-blur-sm bg-black/30 rounded-2xl px-4 py-2 border border-white/20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300 backdrop-blur-sm',
              index === currentSlide
                ? 'w-8 bg-white/95 shadow-lg scale-110'
                : 'bg-white/70 hover:bg-white hover:scale-105',
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/40 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white hover:bg-white/60 hover:scale-110 shadow-2xl transition-all duration-300 z-40 border border-white/30 drop-shadow-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-7 h-7 drop-shadow-md" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/40 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white hover:bg-white/60 hover:scale-110 shadow-2xl transition-all duration-300 z-40 border border-white/30 drop-shadow-xl"
        aria-label="Next slide"
      >
        <ChevronRight className="w-7 h-7 drop-shadow-md" />
      </button>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 backdrop-blur-sm rounded-full z-40 shadow-lg border border-white/20 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-primary to-secondary shadow-md rounded-full transition-all duration-700 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default Carousel;
