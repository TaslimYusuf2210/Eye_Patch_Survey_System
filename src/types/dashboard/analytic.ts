import type { ReactNode } from 'react';

export interface StatsCardProps {
  title: string;
  value: string | number | ReactNode;
  change: number;
  chartColor?: string;
}

export interface DashboardStats {
  survey_quantity: number;
  total_responses: number;
  questions_responded: number;
  new_questions: number;
  change_percentages: {
    survey_quantity: number;
    total_responses: number;
    questions_responded: number;
    new_questions: number;
  };
}

export interface RecentSurvey {
  id: string;
  title: string;
  status: string;
  description: string;
  author_name: string;
  author_avatar: string;
  response_count: number;
  response_limit: number;
  created_at: string;
}