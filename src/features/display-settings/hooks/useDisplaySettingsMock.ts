import {useEffect, useState} from "react";
import {IRowData} from "@/features/display-settings/types/api";
import {waitForSeconds} from "@/shared/lib/utils";
import {IPaginatedResponse, IResponse} from "@/shared";

export const useDisplaySettingsMock = () => {
    const [displaySettings, setDisplaySettings] = useState<IResponse<IPaginatedResponse<IRowData>>>()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        (async () => {
            setIsLoading(true)
            await waitForSeconds(2)
            setDisplaySettings(MOCK_DATA)
            setIsLoading(false)
        })()
    }, []);

    return {
        displaySettings,
        isLoading
    }
}

const MOCK_DATA: IResponse<IPaginatedResponse<IRowData>> = {
    success: true,
    data: {
        count: 3,
        items: [
            {
                id: 1,
                name: "Sayat",
                householdGoods: true,
                kns: true,
                stormDrain: false,
                calculations: false,
            },
            {
                id: 1,
                name: "Sanzhar",
                householdGoods: true,
                kns: true,
                stormDrain: false,
                calculations: true,
            },
            {
                id: 1,
                name: "Almas",
                householdGoods: true,
                kns: true,
                stormDrain: true,
                calculations: false,
            },
        ]
    }
}