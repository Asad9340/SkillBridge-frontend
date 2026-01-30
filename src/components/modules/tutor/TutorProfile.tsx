'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ITutorProfile } from '@/types';

export const TutorProfile = ({ tutor }: { tutor: ITutorProfile }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white border rounded-lg p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400"
              alt={tutor.name}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2">{tutor.name}</h1>
            <p className="text-gray-600 mb-4">{tutor.email}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 p-2 bg-green-50 text-green-700 rounded-lg">
                <span className="text-lg font-bold">Rating {tutor.rating.toFixed(1)}</span>
                <span>({tutor.totalReviews})</span>
              </div>
              <div className="px-4 py-1.5 bg-blue-500 text-white rounded-lg text-center flex items-center gap-1">
                <div className="text-2xl font-bold">৳{tutor.hourlyRate}</div>
                <div className="text-xs uppercase">per hour</div>
              </div>
            </div>
          </div>

          <Link href="/dashboard/update-profile">
            <Button>Edit Profile</Button>
          </Link>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">About Me</h3>
          <p className="text-gray-700">
            {tutor.bio || 'Experienced tutor ready to help you excel in your studies.'}
          </p>
        </div>
      </div>
    </div>
  );
};
