'use server';

import { manageAvailabilityService } from '@/services/manage-availablity.service';

export const getAllAvailability = async (id: string) =>
  manageAvailabilityService.getAllAvailability(id);

export const createAvailability = async (data: {
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
  tutorId: string;
}) => manageAvailabilityService.createAvailability(data);

export const updateAvailability = async (
  id: string,
  data: {
    subjectId: string;
    date: string;
    startTime: string;
    endTime: string;
    tutorId: string;
  },
) => manageAvailabilityService.updateAvailability(id, data);
export const deleteAvailability = async (id: string) =>
  manageAvailabilityService.deleteAvailability(id);
