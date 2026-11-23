import { useQuery } from '@tanstack/react-query';
import { apiClient } from './client';

export type HealthResponse = string | { status?: string };

export async function fetchHealth(): Promise<HealthResponse> {
    const { data } = await apiClient.get<HealthResponse>('/health');
    return data;
}

export function useHealthCheck() {
    return useQuery({
        queryKey: ['health'],
        queryFn: fetchHealth,
        retry: false,
    });
}