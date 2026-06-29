import api from "../axios"

export interface SurveyOption {
    value: string;
}

export interface SurveyQuestion {
    text: string;
    type: string;
    required: boolean;
    options?: SurveyOption[];
}

export interface SurveySection {
    title: string;
    questions: SurveyQuestion[];
}

export interface SurveyProgressPayload {
    title: string;
    description: string;
    category: string;
    audience: string;
    goal: string;
    usage: string;
    startDate?: string;
    endDate?: string;
    responseLimit?: number | null;
    sections: SurveySection[];
}

export async function getSurveys(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
    sort_by?: string;
    order?: string;
}) {
    try {
        const response = await api.get('api/v1/surveys', { params });
        return response.data;
    } catch (error) {
        console.error('Get Surveys error:', error);
        throw error;
    }
}

export async function saveSurveyProgress(payload: SurveyProgressPayload) {
    try {
        const response = await api.post('api/v1/surveys/draft', payload);
        return response.data;
    } catch (error) {
        console.error('Save Survey Progress error:', error);
        throw error;
    }
}

export async function updateSurveyProgress(id: string, payload: SurveyProgressPayload) {
    try {
        const response = await api.put(`api/v1/surveys/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error('Update Survey Progress error:', error);
        throw error;
    }
}