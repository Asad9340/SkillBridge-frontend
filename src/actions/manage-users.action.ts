'use server';

import { manageUserService } from '@/services/mange-users.service';
import { updateTag } from 'next/cache';

export const getAllUsersByAdmin = async () => {
  const res = await manageUserService.getAllUsersByAdmin();
  return res;
};

export const updateUserStatusByAdmin = async (
  userId: string,
  status:string,
) => {
  const res = manageUserService.updateUserStatusByAdmin(userId, status);
  updateTag('manage-users')
  return res;
};

export const updateUserProfile = async (
  userId: string,
  data: { name: string; image: string; phone: string; bio: string },
) => manageUserService.updateUserProfile(userId, data);