import {useEffect} from "react";
import {useCities} from "@/features/common/hooks/useCities";
import {IActivityOption} from "@/features/common/types/api";
import {ICity} from "@/features/common/types/city";
import {useTranslations} from "next-intl";
import {useCommonStore} from "@/features/common/store/useCommonStore";

export const useCommonDataInitialization = () => {
    const t = useTranslations(
        "features.common.components.CommonFields",
    );
    const {setField} = useCommonStore()
    const {data: cities} = useCities();

    const defaultJobStepOptions: IActivityOption[] = [
        {label: t("implementation"), activity: "IMPLEMENTATION"},
        {label: t("designing"), activity: "DESIGNING"},
    ]

    useEffect(() => {
        setField("jobStepOptions", defaultJobStepOptions);
        setField("jobStep", defaultJobStepOptions[0])

        // console.log("Set common initial data")
    }, [setField]);

    useEffect(() => {
        const cityOptions: ICity[] = cities?.success ? cities.data.items : [];
        setField("cityOptions", cityOptions);
        setField("city", cityOptions[0])
    }, [cities, setField])
}