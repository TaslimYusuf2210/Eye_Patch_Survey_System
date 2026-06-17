import api from './axios';
import type { signUpPayload } from '@/types';

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