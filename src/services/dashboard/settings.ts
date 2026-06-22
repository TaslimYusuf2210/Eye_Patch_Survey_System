import api from "../axios"

// Profile endpoints
export async function getProfile() {
    try {
        const response = await api.get('api/v1/users/me');
        return response.data;
    } catch (error) {
        console.error('Get Profile error:', error);
        throw error;
    }
}

export async function updateUserName (payload: { userName: string }) {
    try {
        const response = await api.put(
            'api/v1/users/me/username',
            payload
        )
        return response;
    } catch (error) {
        console.error('Update User Name error:', error);
        throw error;
    }
}

export async function updateAvatar (payload: { avatarUrl: string | null }) {
    try {
        const response = await api.put(
            'api/v1/users/me/avatar',
            payload
        )
        return response;
    } catch (error) {
        console.error('Update Avatar error:', error);
        throw error;
    }
}

export async function deleteAccount() {
    try {
        const response = await api.delete('api/v1/users/me');
        return response;
    } catch (error) {
        console.error('Delete Account error:', error);
        throw error;
    }
}

export async function getUserSettings() {
    try {
        const response = await api.get('api/v1/settings');
        return response.data;
    } catch (error) {
        console.error('Get User Settings error:', error);
        throw error;
    }
}

export async function updateAppearanceAndAccent(payload: { appearance: string; accent_color: string }) {
    try {
        const response = await api.put('api/v1/settings/appearance-accent', payload);
        return response;
    } catch (error) {
        console.error('Update Appearance and Accent error:', error);
        throw error;
    }
}

export async function updateThemePicture(payload: { themePicture: string }) {
    try {
        const response = await api.put('api/v1/settings/theme-picture', payload);
        return response;
    } catch (error) {
        console.error('Update Theme Picture error:', error);
        throw error;
    }
}
