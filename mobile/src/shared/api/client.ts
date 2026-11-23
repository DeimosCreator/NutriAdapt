import { create as createAxios } from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
    console.warn('EXPO_PUBLIC_API_URL не задан в файле .env');
}

export const apiClient = createAxios({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});