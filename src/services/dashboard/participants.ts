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
        console.error("get global response error:", error)
        throw error
    }
}