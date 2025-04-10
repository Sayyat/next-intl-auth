// For completeness, here's the login function if needed:
import {IResponse} from "@/types/api";
import {IUser} from "@/types/global";
import {apiClient} from "@/services/server";
import {handleResponse} from "@/services/api";


export interface IRegisterPayload {
    email: string;
    password: string;
}

// Register a new user with multipart/form-data
export const registerUser = async (
    payload: IRegisterPayload
): Promise<IResponse<IUser>> => {
    return await handleResponse<IUser>(
        apiClient.post("/api/auth/register", payload)
    );
};


export interface ILoginPayload {
    email: string;
    password: string;
}

export const loginUser = async (
    payload: ILoginPayload
): Promise<IResponse<IUser>> => {
    return await handleResponse<IUser>(
        apiClient.post("/api/auth/login", payload)
    );
};


export const refreshToken = async (refresh: string) => {
    console.log({in: "refreshToken", refresh})
    return await handleResponse<{ access: string }>(
        apiClient.post("/api/auth/refresh", {refresh})
    );
};
