'use server';

import { AnalyticsService } from '@/services/analytics.service';

export const getTutorAnalytics = async (tutorId: string) =>
  AnalyticsService.getTutorAnalytics(tutorId);

export const getStudentAnalytics = async () =>
  AnalyticsService.getStudentAnalytics();
export const getAdminAnalytics = async () =>
  AnalyticsService.getAdminAnalytics();

export const getAdminAIInsights = async () =>
  AnalyticsService.getAdminAIInsights();
