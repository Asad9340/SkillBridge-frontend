'use server';

import { manageCategoryService } from '@/services/manage-categories.service';

export const getAllCategories = async () =>
  manageCategoryService.getAllCategories();

export const createCategory = async (data: {
  name: string;
  description?: string;
}) => manageCategoryService.createCategory(data);

export const updateCategory = async (
  id: string,
  data: { name: string; description?: string },
) => manageCategoryService.updateCategory(id, data);

export const deleteCategory = async (id: string) =>
  manageCategoryService.deleteCategory(id);
