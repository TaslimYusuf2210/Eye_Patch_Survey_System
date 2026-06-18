import api from '../axios'

export async function getDashboardStats() {
    try {
        const response = await api.get(
            'api/v1/dashboard/stats'
        )
        return response;
    } catch (error) {
        console.error('Get Dashboard Stats error:', error);
        throw error;
    }
}