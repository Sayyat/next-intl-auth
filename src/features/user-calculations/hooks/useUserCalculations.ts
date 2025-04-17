import {useQuery} from "@tanstack/react-query";
import {IPaginatedResponse, IResponse} from "@/shared";
import {ICalculationRowData} from "@/features/user-calculations/types/api";
import {getUserCalculations} from "@/features/user-calculations/services/api";
import {useUserCalculationsStore} from "@/features/user-calculations/store/userCalculationsStore";

export const useUserCalculations = () => {
    const calculationStore = useUserCalculationsStore()

    const query = useQuery<IResponse<IPaginatedResponse<ICalculationRowData>>, Error>({
        queryKey: ["get_calculations"],
        queryFn: async (): Promise<IResponse<IPaginatedResponse<ICalculationRowData>>> => {
            const calculations = await getUserCalculations()
            if (!calculations.success) throw Error(calculations.error)
            calculationStore.setField("rows", calculations.data)
            return calculations;
        },
    });
}