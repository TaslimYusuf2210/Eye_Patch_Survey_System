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