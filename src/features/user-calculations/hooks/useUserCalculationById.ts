import {useQuery, useQueryClient} from "@tanstack/react-query";
import {IResponse} from "@/shared";
import {ICalculationRowData} from "@/features/user-calculations/types/api";
import {getUserCalculationById} from "@/features/user-calculations/services/api";

export const useUserCalculations = (id: number) => {
    const queryClient = useQueryClient();
    return useQuery<IResponse<ICalculationRowData>, Error>({
        queryKey: ["get_calculation_by_id", id],
        queryFn: (): Promise<IResponse<ICalculationRowData>> => getUserCalculationById(id)
    });
}