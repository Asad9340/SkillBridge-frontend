'use server';

import { manageUserService } from '@/services/mange-users.service';
import { updateTag } from 'next/cache';

export const getAllUsersByAdmin = async () => {
  const res = await manageUserService.getAllUsersByAdmin();
  return res;
};

export const updateUserStatusByAdmin = async (
  userId: string,
  status: string,
) => {
  const res = await manageUserService.updateUserStatusByAdmin(userId, status);
  updateTag('manage-users');
  return res;
};

export const updateUserRoleByAdmin = async (userId: string, role: string) => {
  const res = await manageUserService.updateUserRoleByAdmin(userId, role);
  updateTag('manage-users');
  return res;
};

export const updateUserProfile = async (
  userId: string,
  data: { name: string; phone: string; bio: string; image?: string },
) => manageUserService.updateUserProfile(userId, data);

export const uploadUserAvatar = async (userId: string, formData: FormData) =>
  manageUserService.uploadUserAvatar(userId, formData);
