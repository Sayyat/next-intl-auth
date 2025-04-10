import {IResponse} from "@/types/api";
import {getUserLocale} from "@/locales/config/server";
import {handleResponse} from "@/services/api";
import {apiClient} from "@/services/client";

export interface IResetPayload {
    email: string;
}

export interface IResetResponse {
    message: string;
}

export const resetPassword = async (
    payload: IResetPayload
): Promise<IResponse<IResetResponse>> => {
    const language = await getUserLocale()
    return await handleResponse<IResetResponse>(
        apiClient.post("/api/password-reset/", {
            email: payload.email,
            language,
        })
    );
};
