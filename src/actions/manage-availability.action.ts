'use server';

import { manageAvailabilityService } from '@/services/manage-availablity.service';
import { manageSubjectService } from '@/services/manage-subjects.service';

export const getAllAvailability = async (id: string) =>
  manageAvailabilityService.getAllAvailability(id);

export const createAvailability = async (data: {
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
  tutorId: string;
}) => manageAvailabilityService.createAvailability(data);

export const updateSubject = async (
  id: string,
  data: { name: string; categoryId: string },
) => manageSubjectService.updateSubject(id, data);
export const deleteSubject = async (id: string) =>
  manageSubjectService.deleteSubject(id);
