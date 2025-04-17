import {useMutation} from "@tanstack/react-query";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {fetchAltoBioCleanList, submitAltoBioClean} from "../services/ab";
import {useAbStore} from "../store/useAbStore";
import {
    IAltoBioCleanPayload,
    IAltoBioCleanSelectItem,
    IAltoBioCleanSubmitPayload
} from "../types/ab";

export const useAltoBioCleanCalculations = () => {
        const {
            ab,
            altoBioCleanItems,
            selectedAltoBioCleanItem,
            setSelectedAltoBioCleanItem,
            setAltoBioCleanItems,
            setAltoBioCleanSubmitResult
        } = useAbStore();

        // Mutation to fetch the Alta Bio Clean list
        const fetchListMutation = useMutation<IAltoBioCleanSelectItem[], Error>({
                mutationFn: async () => {
                    const payload: IAltoBioCleanPayload = {
                        wastewater_flow: ab.wastewaterConsumption
                    };
                    const response = await fetchAltoBioCleanList(payload);
                    if (!response.success) {
                        setAltoBioCleanItems([])
                        throw new Error(response.error);
                    }
                    setAltoBioCleanItems(response.data);
                    // console.log({list: response.data})
                    return response.data;
                },

                onSuccess: (data) => {
                    // console.log("Alta Bio Clean list fetched successfully!");
                },
                onError: (error) => {
                    console.error("Fetch Alta Bio Clean List Error:", error);
                }
            }
        );

        // Mutation to submit the AB form for Alta Bio Clean
        const submitMutation = useMutation({
            mutationFn: async () => {
                // Ensure a selected item exists
                if (!selectedAltoBioCleanItem) {
                    throw new Error("No Alto Bio Clean item selected.");
                }
                // Merge the payload with the selected item's id
                const fullPayload: IAltoBioCleanSubmitPayload = {
                    volley: ab.volley,
                    supply_depth: ab.supplyDepth,
                    alta_bio_clean_id: selectedAltoBioCleanItem.id
                };
                const response = await submitAltoBioClean(fullPayload);
                if (!response.success) {
                    throw new Error(response.error);
                }
                console.log(response.data)

                setAltoBioCleanSubmitResult(response.data);
                return response.data;
            },
            onSuccess: (data) => {
                toast.success("Alta Bio Clean submission successful!");
            },
            onError: (error) => {
                console.error("Alta Bio Clean Submission Error:", error);
                toast.error(error.message || "Alta Bio Clean submission failed. Please try again.");
            }
        });

        useEffect(() => {
            fetchListMutation.mutate();
        }, [ab.wastewaterConsumption]);

        useEffect(() => {
            setSelectedAltoBioCleanItem(altoBioCleanItems[0])
        }, [altoBioCleanItems])

        return submitMutation;
    }
;
