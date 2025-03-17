// Centralized error extraction
import axios from "axios";
import {ApiListResponse, ApiResponse} from "@/types/api";
import {getTranslator} from "@/locales/config/translation";

export function extractErrorMessage(
    error: unknown,
    translator: (key: string) => string
): string {
    if (axios.isAxiosError(error) && error.response?.data) {
        const {code, message} = error.response.data;
        // console.log({code, message})

        if (!code && !message) {
            return translator("services.serverError")
        }

        return translator(`services.${code}`) || message;
    }
    return translator("services.unknownError");
}

// Handle API responses
export async function handleResponse<T>(
    request: Promise<any>,
    translator?: (key: string) => string
): Promise<ApiResponse<T>> {
    const t = translator || (await getTranslator());
    try {
        const response = await request;
        return {success: true, data: response.data as T};
    } catch (error) {
        // console.error("API Error:", error);
        return {success: false, error: extractErrorMessage(error, t)};
    }
}

// Handle API responses
export async function handleListResponse<T>(
    request: Promise<any>,
): Promise<ApiListResponse<T>> {
    try {
        const response = await request;
        return response.data as ApiListResponse<T>;
    } catch (error) {
        // console.error("API Error:", error);
        return {
            count: 0,
            items: []
        }
    }
}
