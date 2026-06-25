import api from "../axios";

export async function getGlobalParticipants(params?: {
    page?: number,
    limit?: number,
    search?: string,
}) {
    try {
        const response = await api.get('api/v1/participants', {params})
        return response.data
    } catch (error) {
        console.error("get global participants error:", error)
        throw error
    }
}

export async function getParticipantsBySurveyId({ id, ...queryParams }: {
    id: string;
    page?: number;
    limit?: number;
    search?: string;
}) {
    try {
        const response = await api.get(`api/v1/${id}/participants`, { params: queryParams })
        return response.data
    } catch (error) {
        console.error("get participants by survey id error:", error)
        throw error
    }
}

