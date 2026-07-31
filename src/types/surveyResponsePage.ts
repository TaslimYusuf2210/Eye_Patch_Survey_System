export interface SurveyQuestion {
  id?: string;
  text: string;
  type: string;
  required: boolean;
  options: { id?: string; value: string }[];
}

export interface SurveySectionData {
  title: string;
  questions: SurveyQuestion[];
}

export interface SurveyData {
  id: string;
  title: string;
  description: string;
  sections: SurveySectionData[];
}
