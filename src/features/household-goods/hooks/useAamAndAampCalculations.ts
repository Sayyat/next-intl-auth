import {
    IDisinfectionUnitPayload,
    IBufferCapacityResponse,
    ICleaningStationResponse,
    IDisinfectionUnitResponse,
    ICleaningStationPayload,
    IBufferCapacityPayload
} from "../types/aamAndAamp";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {fetchBufferCapacity, fetchCleaningStation, fetchDisinfectionUnit} from "../services/aamAndAamp";
import {useAamAndAampStore} from "../store/useAamAndAampStore";

export const useAamAndAampCalculations = () => {
    const {aamp, setAampResults} = useAamAndAampStore();

    return useMutation({
        mutationFn: async () => {
            const bufferCapacityPayload: IBufferCapacityPayload = {
                total_volume: aamp.totalVolumeOfVolleys,
                waste_water_flow: aamp.wastewaterConsumption,
                count_salvos: aamp.volleyCount,
                inlet_depth: aamp.feederDepth,
            };
            const cleaningStationPayload: ICleaningStationPayload = {
                waste_water_flow: aamp.wastewaterConsumption,
                inlet_depth: aamp.feederDepth,
            };

            const disinfectionPayload: IDisinfectionUnitPayload = {
                waste_water_flow: aamp.wastewaterConsumption,
                inlet_depth: aamp.feederDepth,
            };

            const responses = await Promise.allSettled([
                fetchBufferCapacity(bufferCapacityPayload),
                fetchCleaningStation(cleaningStationPayload),
                fetchDisinfectionUnit(disinfectionPayload),
            ]);

            if (
                responses.some(
                    (r) => r.status === "rejected" || (r.status === "fulfilled" && !r.value.success)
                )
            ) {
                throw new Error("Calculation error");
            }

            const result = {
                bufferCapacity:
                    responses[0].status === "fulfilled" && responses[0].value.success
                        ? responses[0].value.data as IBufferCapacityResponse
                        : undefined,
                cleaningStation:
                    responses[1].status === "fulfilled" && responses[1].value.success
                        ? responses[1].value.data as ICleaningStationResponse
                        : undefined,
                disinfectionUnit:
                    responses[2].status === "fulfilled" && responses[2].value.success
                        ? responses[2].value.data as IDisinfectionUnitResponse
                        : undefined,
            };
            console.log(result.bufferCapacity)
            setAampResults(result);
            return result;
        },

        onSuccess: () => {
            toast.success("✅ Calculations completed successfully!");
        },

        onError: (error) => {
            console.error("🚨 Calculation error:", error);
            toast.error("❌ An error occurred while calculating. Please try again.");
        },
    });
};
