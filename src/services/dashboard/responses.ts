import api from "../axios"

export async function getGlobalResponse(params?: {
    page?: number,
    limit?: number,
}) {
    try {
        const response = await api.get('api/v1/responses', {params})
        return response.data
    } catch (error) {
        console.error("get global response error:", error)
        throw error
    }
}

export async function getResponseById({ id, ...queryParams }: {
    id: string;
    page?: number;
    limit?: number;
    sort_by?: "completed_at" | "time_taken_sec";
    order?: "asc" | "desc";
}) {
    try {
        const response = await api.get(`api/v1/surveys/${id}/responses`, { params: queryParams })
        return response.data
    } catch (error) {
        console.error("get response by survey id error:", error)
        throw error
    }
}