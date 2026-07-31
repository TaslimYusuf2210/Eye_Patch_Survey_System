import api from './axios';

export interface SubmitResponsePayload {
  respondent_email: string;
  answers: {
    question_id: string;
    answer_text?: string;
    answer_option_ids?: string[];
    likert_value?: number;
    yes_no_value?: boolean;
  }[];
}

export async function submitSurveyResponse(surveyId: string, payload: SubmitResponsePayload) {
  try {
    const response = await api.post(`api/v1/surveys/${surveyId}/responses`, payload);
    return response.data;
  } catch (error) {
    console.error('Submit Response error:', error);
    throw error;
  }
}
