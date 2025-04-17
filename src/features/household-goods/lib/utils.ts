import {
    IAggregatedCountItem,
    IAggregatedCountsMap,
    IBufferCapacityDiameterData,
    IBufferCapacityResponse,
    ICleaningStationResponse, IDisinfectionUnitCounts,
    IDisinfectionUnitResponse, INeckData
} from "@/features/household-goods/types/aamAndAamp";
import {IAltaBioCleanCounts, IAltoBioCleanSubmitResult} from "../types/ab";
import {IDiameterNumberPair} from "../types/api";

export const formatCleaningStationDiameterData = (
    data?: IAggregatedCountsMap
): string => {
    if (!data) return "-"

    const formattedEntries: string[] = [];

    // Iterate over each diameter type
    ["630", "955", "1220"].forEach((diameterKey) => {
        const diameterData = data?.[diameterKey as keyof IAggregatedCountsMap] as IAggregatedCountItem;

        Object.entries(diameterData.counts).forEach(([size, count]) => {
            if (count > 0) {
                formattedEntries.push(`${diameterKey}-${size} - ${count}шт`);
            }
        });
    });

    return formattedEntries.join("; ");
};


export const formatDisinfectionUnitDiameterData = (
    data?: IDisinfectionUnitCounts
): string => {
    if (!data) return "-"

    const formattedEntries: string[] = [];

    // Iterate over each diameter type
    ["diameter_630", "diameter_955", "diameter_1220"].forEach((diameterKey) => {
        const diameterData = data?.[diameterKey as keyof IDisinfectionUnitCounts] as IDiameterNumberPair;

        Object.entries(diameterData).forEach(([size, count]) => {
            if (count > 0) {
                formattedEntries.push(`${diameterKey.replace("diameter_", "")}-${size} - ${count}шт`);
            }
        });
    });

    return formattedEntries.join("; ");
};


export function formatBufferCapacityAllocation(data?: INeckData): string {
    if (!data) return "-"
    const formattedEntries: string[] = [];

    // Iterate through 630 and 1220 allocations
    ["630", "955", "1220"].forEach((diameterKey) => {
        const diameterData = data[diameterKey as keyof INeckData] as IBufferCapacityDiameterData;

        Object.entries(diameterData.allocation).forEach(([size, diameterAllocation]) => {
            if (diameterAllocation.count > 0) {
                formattedEntries.push(`${diameterKey}-${size} - ${diameterAllocation.count}шт`);
            }
        });
    });

    return formattedEntries.join("; ");
}
