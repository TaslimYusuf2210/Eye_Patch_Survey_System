import api from './axios';
import type { signUpPayload, loginPayload } from '@/types';

export async function signUp(payload:signUpPayload) {
    try {
        const response = await api.post(
            'api/v1/auth/signup',
            payload
        )
        return response;
    } catch (error) {
        console.error('Sign Up error:', error);
        throw error;
    }
}

export async function login(payload:loginPayload) {
    try {
        const response = await api.post(
            'api/v1/auth/login',
            payload
        )
        return response;
    } catch (error) {
        console.error('Sign In error:', error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await api.post('api/v1/auth/logout');
        return response;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

export async function getMe() {
    try {
        const response = await api.get(
            'api/v1/auth/me'
        )
        return response;
    } catch (error) {
        console.error('Get Me error:', error);
        throw error;
    }
}

export async function updatePassword(payload: { currentPassword: string; newPassword: string }) {
    try {
        const response = await api.put(
            'api/v1/auth/password',
            payload
        )
        return response;
    } catch (error) {
        console.error('Update Password error:', error);
        throw error;
     }
}