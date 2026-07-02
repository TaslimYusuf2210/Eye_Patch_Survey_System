import api from './axios';

export interface SubmitResponsePayload {
  surveyId: string;
  respondentName: string;
  respondentEmail: string;
  answers: {
    questionId: string;
    answer_text?: string;
    likert_value?: number;
    yes_no_value?: boolean;
    selected_options?: string[];
  }[];
}

export async function submitSurveyResponse(payload: SubmitResponsePayload) {
  try {
    const response = await api.post('api/v1/responses', payload);
    return response.data;
  } catch (error) {
    console.error('Submit Response error:', error);
    throw error;
  }
}
