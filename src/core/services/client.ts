import {IResponse} from "@/types/api";
import {IStatus} from "@/types/global";
import {apiClient} from "@/services/client";
import {handleResponse} from "@/services/api";


export const getStatuses = async (): Promise<IResponse<IStatus[]>> => {
    return await handleResponse<IStatus[]>(
        apiClient.get("/api/status/student-status")
    );
};
