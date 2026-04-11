'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ITutorProfile } from '@/types';

export const TutorProfile = ({ tutor }: { tutor: ITutorProfile }) => {
  const initials = tutor.name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 bg-muted text-2xl font-semibold flex items-center justify-center">
            {initials}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {tutor.name}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {tutor.email}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                <span className="font-semibold">
                  Rating {tutor.rating.toFixed(1)}
                </span>
                <span className="text-sm">({tutor.totalReviews})</span>
              </div>

              <div className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-center flex items-center gap-2">
                <span className="text-xl font-bold">৳{tutor.hourlyRate}</span>
                <span className="text-xs uppercase opacity-90">per hour</span>
              </div>
            </div>
          </div>

          <Link href="/dashboard/update-profile">
            <Button variant="default">Edit Profile</Button>
          </Link>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            About Me
          </h3>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {tutor.bio ||
              'Experienced tutor ready to help you excel in your studies.'}
          </p>
        </div>
      </div>
    </div>
  );
};
