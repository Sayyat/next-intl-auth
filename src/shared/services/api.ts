// Centralized error extraction
import axios, {AxiosInstance} from "axios";
import {IPaginatedResponse, IPaginationParams, IResponse} from "@/shared";
import {getTranslator} from "@/locales/config/translation";
import {DEFAULT_PAGINATION_PARAMS} from "@/shared/lib/constants";
import {buildQueryParams} from "@/shared/lib/query";
import {apiClient} from "@/shared/services/client";

export const paginatedGet = async <T>(
    url: string,
    params: IPaginationParams = DEFAULT_PAGINATION_PARAMS,
    translator?: (key: string) => string
): Promise<IResponse<IPaginatedResponse<T>>> => {
    const query = buildQueryParams(params);
    return await handleResponse<IPaginatedResponse<T>>(
        apiClient.get(`${url}${query}`),
        translator
    );
};


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

        // ✅ Try to translate error code, otherwise return `message`
        const translatedMessage = translator(`services.${code}`);
        return translatedMessage !== `services.${code}` ? translatedMessage : message;
    }
    return translator("services.unknownError");
}

// Handle API responses
export async function handleResponse<T>(
    request: Promise<any>,
    translator?: (key: string) => string
): Promise<IResponse<T>> {
    const t = translator || (await getTranslator());
    try {
        const response = await request;
        return {success: true, data: response.data as T};
    } catch (error) {
        // console.error("API Error:", error);
        return {success: false, error: extractErrorMessage(error, t)};
    }
}

export const createApiService = (apiClient: AxiosInstance) => {
    return {
        postWithHandle: <T>(
            url: string,
            payload: unknown,
            translator?: (key: string) => string
        ): Promise<IResponse<T>> =>
            handleResponse<T>(apiClient.post(url, payload), translator),

        getWithHandle: <T>(
            url: string,
            translator?: (key: string) => string
        ): Promise<IResponse<T>> =>
            handleResponse<T>(apiClient.get(url), translator),

        getPaginatedWithHandle: <T>(
            url: string,
            params: IPaginationParams = DEFAULT_PAGINATION_PARAMS,
            translator?: (key: string) => string
        ): Promise<IResponse<IPaginatedResponse<T>>> => {
            const query = buildQueryParams(params);
            return handleResponse<IPaginatedResponse<T>>(
                apiClient.get(`${url}${query}`),
                translator
            );
        },

        patchWithHandle: <T>(
            url: string,
            payload: unknown,
            translator?: (key: string) => string
        ): Promise<IResponse<T>> =>
            handleResponse<T>(apiClient.patch(url, payload), translator),

        postFormWithHandle: <T>(
            url: string,
            formData: FormData,
            translator?: (key: string) => string
        ): Promise<IResponse<T>> =>
            handleResponse<T>(
                apiClient.post(url, formData, {
                    headers: {"Content-Type": "multipart/form-data"},
                }),
                translator
            )
    };
};