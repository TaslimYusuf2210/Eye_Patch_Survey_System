export interface ReviewSummaryStepProps {
  // formData: FieldValues;
}

export interface OptionsEditorProps {
  sectionIndex: number;
  questionIndex: number;
  questionType: string;
}

export interface SurveySectionProps {
  sectionIndex: number;
}

export interface QuestionProps {
  sectionIndex: number;
  questionIndex: number;
  questionType?: 'multiple_choice' | 'single_choice' | 'text' | 'likert_scale' | 'yes_no';
}