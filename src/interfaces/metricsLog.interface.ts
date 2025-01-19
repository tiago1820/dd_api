export interface Metrics {
    totalRequests: number;
    routeAccessCount: Record<string, number>;
    totalErrors: number;
}