import {useEffect, useState} from "react";
import {ICalculationRowData} from "@/features/user-calculations/types/api";
import {waitForSeconds} from "@/shared/lib/utils";
import {IPaginatedResponse, IResponse} from "@/shared";

export const useUserCalculationsMock = () => {
    const [userCalculations, setUserCalculations] = useState<IResponse<IPaginatedResponse<ICalculationRowData>>>()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        (async () => {
            setIsLoading(true)
            await waitForSeconds(2)
            setUserCalculations(MOCK_DATA)
            setIsLoading(false)
        })()
    }, []);

    return {
        userCalculations,
        isLoading
    }
}

const MOCK_DATA: IResponse<IPaginatedResponse<ICalculationRowData>> = {
    success: true,
    data: {
        count: 3,
        items: [
            {
                id: 1,
                name: "Sayat",
                organization: "ZIZ INC",
                city: {
                    id: 1,
                    city_name: "Astana"
                },
                object_name: "Object 1",
                created_at: "2025-04-16T14:48:00.000Z",
            },
            {
                id: 2,
                name: "Sanzhar",
                organization: "ZIZ INC",
                city: {
                    id: 1,
                    city_name: "Astana"
                },
                object_name: "Object 2",
                created_at: "2025-04-16T14:48:00.000Z",
            },
        ]
    }
}