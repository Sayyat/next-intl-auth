import {ApiResponse} from "@/types/api";
import {IStatus} from "@/types/global";
import {apiClient} from "@/services/client";
import {handleResponse} from "@/services/api";


export const getStatuses = async (): Promise<ApiResponse<IStatus[]>> => {
    return await handleResponse<IStatus[]>(
        apiClient.get("/api/status/student-status")
    );
};
