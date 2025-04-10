export type IResponse<T> =
    | { success: true; data: T }
    | { success: false; error: string };


export interface IPaginatedResponse<T> {
    count: number;
    items: T[];
}


export interface IPaginationParams extends Record<string, any> {
    limit: number;
    offset: number;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
