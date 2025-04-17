import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/features/display-settings/lib/queryKeys";
import {IPaginatedResponse, IResponse} from "@/shared";
import {IRowData} from "@/features/display-settings/types/api";
import {getSettings, postRowSettings} from "@/features/display-settings/services/api";
import {toast} from "react-toastify";

export const useDisplaySettings = () => {
    const queryClient = useQueryClient();

    // Запрос для getSettings
    const getSettingsQuery = useQuery<IResponse<IPaginatedResponse<IRowData>>, Error>({
        queryKey: QUERY_KEYS.getSettings,
        queryFn: (): Promise<IResponse<IPaginatedResponse<IRowData>>> =>
            getSettings(),
    });
    // Запрос для postSettings
    const postRowSettingsMutation = useMutation({
        mutationKey: QUERY_KEYS.postSettings,
        mutationFn: async (data: IRowData) => {
            const response = await postRowSettings(data);
            if (!response.success) throw new Error(response.error); // ✅ Throw error if API fails
            return response.data;
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({queryKey: QUERY_KEYS.getSettings}); // ✅ Refresh settings

        },
        onSuccess: async (data: IRowData) => {
            toast.success("Profile updated successfully!");
        },
        onError: async (error) => {
            toast.error(error.message || "Failed to update settings.");
        },
    });

    return {
        getSettingsQuery,
        postRowSettingsMutation,
    }
}