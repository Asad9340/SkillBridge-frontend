'use server';

import { manageSubjectService } from "@/services/manage-subjects.service";


export const getAllSubjects = async () => manageSubjectService.getAllSubjects();
export const createSubject = async (data: { name: string; categoryId: string }) =>
  manageSubjectService.createSubject(data);
export const updateSubject = async (
  id: string,
  data: { name: string; categoryId: string },
) => manageSubjectService.updateSubject(id, data);
export const deleteSubject = async (id: string) => manageSubjectService.deleteSubject(id);
