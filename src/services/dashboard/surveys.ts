import api from "../axios"

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