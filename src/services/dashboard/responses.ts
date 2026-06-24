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