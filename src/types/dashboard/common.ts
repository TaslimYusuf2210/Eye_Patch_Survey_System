import React from "react";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export interface StateController {
  step: number;
}

export type Action =
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "GOTO"; payload: number };

export interface CreateSurveyFormData {
  title: string;
  description: string;
  category: string;
  audience: string;
  goal: string;
  usage: string;
  startDate?: string | undefined;
  endDate?: string | undefined;
  responseLimit?: number | undefined;
}