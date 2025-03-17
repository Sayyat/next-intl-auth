import {useState, useEffect} from "react";
import {getStatuses} from "@/core/services/client";
import {toast} from "react-toastify";
import {useTranslations} from "next-intl";

interface Status {
    value: string;
    label: string;
}

export const useStatuses = () => {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [statusLoading, setStatusLoading] = useState(true);
    const t = useTranslations();

    useEffect(() => {
        async function fetchStatusesData() {
            try {
                const response = await getStatuses();
                if (response.success) {
                    setStatuses(response.data);
                } else {
                    toast.error(response.error);
                }
            } catch (error) {
                toast.error(t("unknownError"));
            } finally {
                setStatusLoading(false);
            }
        }

        fetchStatusesData();
    }, []);

    return {statuses, statusLoading};
};
