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

export async function getRecentSurveys(limit: number = 5) {
    try {
        const response = await api.get(
            'api/v1/dashboard/recent-surveys',
            { params: { limit } }
        )
        return response;
    } catch (error) {
        console.error('Get Recent Surveys error:', error);
        throw error;
    }
}
