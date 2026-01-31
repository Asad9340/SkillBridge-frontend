'use server';

import { tutorService } from '@/services/tutor.service';

export const UpdateTutorProfile = async (
  id: string,
  data: { bio: string; hourlyRate: number },
) => tutorService.UpdateTutorProfile(id, data);
export const createTutorProfile = async (data: {
  userId: string;
  bio: string;
  hourlyRate: number;
}) => tutorService.createTutorProfile(data);
