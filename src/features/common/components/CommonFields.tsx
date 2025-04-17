import React from "react";
import {useTranslations} from "next-intl";
import {Select} from "@/shared/components/Select";
import {IActivityOption, ICity} from "@/features/common";
import {FloatingLabelInput} from "@/shared/components/FloatingLabelInput";
import {useCommonStore} from "@/features/common/store/useCommonStore";
import {useCommonDataInitialization} from "@/features/common/hooks/useCommonDataInitialization";

export const CommonFields: React.FC = () => {
    const t = useTranslations("features.common.components.CommonFields");
    const {jobStep, jobStepOptions, city, cityOptions, objectName, errors, setField} = useCommonStore();
    useCommonDataInitialization()
    return (
        <div className="w-full flex flex-col items-start gap-6">
            <span className="text-foreground font-medium text-xl">{t("jobStepSelect")}</span>
            <Select<IActivityOption>
                name="jobStep"
                label={t("jobStep")}
                options={jobStepOptions}
                optionValueKey="activity"
                optionLabelKeys={["label"]}
                wrapperClassName="p-0"
                value={jobStep}
                onChange={(value) => setField("jobStep", value)}
                error={errors.jobStep?._errors[0]}
            />
            <span className="text-foreground font-medium text-xl">{t("objectInformation")}</span>
            <Select<ICity>
                name="city"
                label={t("city")}
                options={cityOptions}
                optionValueKey="id"
                optionLabelKeys={["city_name"]}
                wrapperClassName="p-0"
                value={city}
                onChange={(value) => setField("city", value)}
                error={errors.city?._errors[0]}
            />
            <FloatingLabelInput
                type="text"
                name="objectName"
                label={t("objectName")}
                value={objectName ?? ""}
                onChange={(e) => setField("objectName", e.target.value)}
                error={errors.objectName?._errors[0]}
            />
        </div>
    );
};