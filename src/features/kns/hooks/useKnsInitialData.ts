import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {
    getAcceptedDimensionsDiameters,
    getAcceptedDimensionsHeights,
    getAccordingCustomerRequirementsDiameters,
    getPressureCollectorCounts,
    getPressureCollectorDiameters,
    getPumpPipeGuidesDiameters,
    getPumpPressurePipeDiameters,
    getSupplyManifoldDiameters,
} from "@/features/kns/services/paginated";
import {useKnsStore} from "@/features/kns/store/useKnsStore";
import {IPaginatedResponse, IResponse} from "@/shared";
import {
    IKnsControlCabinetItem,
    IKnsDiameterItem,
    IKnsHeightItem,
    IKnsQuantityItem
} from "@/features/kns/types/response";
import {QUERY_KEYS} from "@/features/kns/lib/queryKeys";
import {useTranslations} from "next-intl";

type PumpPressureResponse = IResponse<IPaginatedResponse<IKnsDiameterItem>>;
type SupplyManifoldResponse = IResponse<IPaginatedResponse<IKnsDiameterItem>>;
type PressureCollectorResponseDiameter = IResponse<IPaginatedResponse<IKnsDiameterItem>>;
type PressureCollectorResponseCount = IResponse<IPaginatedResponse<IKnsQuantityItem>>;
type CustomerRequirementsResponse = IResponse<IPaginatedResponse<IKnsDiameterItem>>;
type AcceptedHeightsResponse = IResponse<IPaginatedResponse<IKnsHeightItem>>;
type AccordingCustomerRequirementsDimensionCalculationsResponse = IResponse<IPaginatedResponse<IKnsDiameterItem>>;
type AcceptedDiametersResponse = IResponse<IPaginatedResponse<IKnsDiameterItem>>;

export const useKnsInitialData = () => {
    const t = useTranslations("features.kns.components.KnsComponent");
    const setField = useKnsStore((state) => state.setField);
    const initialData = useKnsStore((state) => state.initialData);
    const pumpState = useKnsStore((state) => state.pump);
    const supplyManifoldState = useKnsStore((state) => state.supplyManifold);
    const pressureCollectorState = useKnsStore((state) => state.pressureCollector);
    const accordingCustomerRequirementsDimensionCalculationsState = useKnsStore((state) => state.accordingCustomerRequirementsDimensionCalculations)
    const acceptedDimensionsState = useKnsStore((state) => state.acceptedDimensions)

    const defaultControlCabinetItems: IKnsControlCabinetItem[] = [
        {id: 0, value: 0},
        {id: 1, value: 1},
    ]

    useEffect(() => {
        setField("controlCabinetItems", defaultControlCabinetItems);
        setField("initialData", {
            ...initialData,
            controlCabinet: defaultControlCabinetItems[0]
        });
        console.log("Set initial data")
    }, [setField]);

    // Запрос для pumpPressurePipeDiameters
    const pumpPressureQuery = useQuery<PumpPressureResponse, Error>({
        queryKey: QUERY_KEYS.pumpPressurePipeDiameters,
        queryFn: (): Promise<PumpPressureResponse> =>
            getPumpPressurePipeDiameters(),
    });

    useEffect(() => {
        if (pumpPressureQuery.data?.success) {
            setField("pumpPressurePipeDiameters", pumpPressureQuery.data.data.items);
            setField("pump", {
                ...pumpState,
                pressurePipeDiameter: pumpPressureQuery.data.data.items[0]
            });
        }
    }, [pumpPressureQuery.data, setField]);

    // Запрос для pumpPressurePipeDiameters
    const pumpPipeGuidesQuery = useQuery<PumpPressureResponse, Error>({
        queryKey: QUERY_KEYS.pumpPipeGuidesDiameters,
        queryFn: (): Promise<PumpPressureResponse> =>
            getPumpPipeGuidesDiameters(),
    });

    useEffect(() => {
        if (pumpPipeGuidesQuery.data?.success) {
            setField("pumpPipeGuidesDiameters", pumpPipeGuidesQuery.data.data.items);
            setField("pump", {
                ...pumpState,
                pipeGuideDiameter: pumpPipeGuidesQuery.data.data.items[0]
            });
        }
    }, [pumpPipeGuidesQuery.data, setField]);

    // Запрос для supplyManifoldDiameters
    const supplyManifoldQuery = useQuery<SupplyManifoldResponse, Error>({
        queryKey: QUERY_KEYS.supplyManifoldDiameters,
        queryFn: (): Promise<SupplyManifoldResponse> =>
            getSupplyManifoldDiameters(),
    });

    useEffect(() => {
        if (supplyManifoldQuery.data?.success) {
            setField("supplyManifoldDiameters", supplyManifoldQuery.data.data.items);
            setField("supplyManifold", {
                ...supplyManifoldState,
                diameter: supplyManifoldQuery.data.data.items[0]
            });
        }
    }, [supplyManifoldQuery.data, setField]);

    // Запрос для pressureCollectorDiameters
    const pressureCollectorDiametersQuery = useQuery<PressureCollectorResponseDiameter, Error>({
        queryKey: QUERY_KEYS.pressureCollectorDiameters,
        queryFn: (): Promise<PressureCollectorResponseDiameter> =>
            getPressureCollectorDiameters(),
    });

    useEffect(() => {
        if (pressureCollectorDiametersQuery.data?.success) {
            setField("pressureCollectorDiameters", pressureCollectorDiametersQuery.data.data.items);
            setField("pressureCollector", {
                ...pressureCollectorState,
                diameter: pressureCollectorDiametersQuery.data.data.items[0]
            });
        }
    }, [pressureCollectorDiametersQuery.data, setField]);

    // Запрос для pressureCollectorCounts
    const pressureCollectorCountsQuery = useQuery<PressureCollectorResponseCount, Error>({
        queryKey: QUERY_KEYS.pressureCollectorCounts,
        queryFn: (): Promise<PressureCollectorResponseCount> =>
            getPressureCollectorCounts(),
    });

    useEffect(() => {
        if (pressureCollectorCountsQuery.data?.success) {
            setField("pressureCollectorCounts", pressureCollectorCountsQuery.data.data.items);
            setField("pressureCollector", {
                ...pressureCollectorState,
                amount: pressureCollectorCountsQuery.data.data.items[0]
            });
        }
    }, [pressureCollectorCountsQuery.data, setField]);

    // Запрос для accordingCustomerRequirementsDiameters
    const customerRequirementsQuery = useQuery<CustomerRequirementsResponse, Error>({
        queryKey: QUERY_KEYS.accordingCustomerRequirementsDiameters,
        queryFn: (): Promise<CustomerRequirementsResponse> =>
            getAccordingCustomerRequirementsDiameters(),
    });

    useEffect(() => {
        if (customerRequirementsQuery.data?.success) {
            setField("accordingCustomerRequirementsDiameters", customerRequirementsQuery.data.data.items);
        }
    }, [customerRequirementsQuery.data, setField]);

    // Запрос для acceptedDimensionsHeights
    const acceptedHeightsQuery = useQuery<AcceptedHeightsResponse, Error>({
        queryKey: QUERY_KEYS.acceptedDimensionsHeights,
        queryFn: (): Promise<AcceptedHeightsResponse> =>
            getAcceptedDimensionsHeights(),
    });

    useEffect(() => {
        if (acceptedHeightsQuery.data?.success) {
            setField("acceptedDimensionsHeights", acceptedHeightsQuery.data.data.items);
            setField("acceptedDimensions", {
                ...acceptedDimensionsState,
                height: acceptedHeightsQuery.data.data.items[0]
            });
        }
    }, [acceptedHeightsQuery.data, setField]);

    // Запрос для acceptedDimensionsDiameters
    const accordingCustomerRequirementsDimensionCalculationsQuery = useQuery<AccordingCustomerRequirementsDimensionCalculationsResponse, Error>({
        queryKey: QUERY_KEYS.accordingCustomerRequirementsDiameters,
        queryFn: (): Promise<AcceptedDiametersResponse> =>
            getAcceptedDimensionsDiameters(),
    });

    useEffect(() => {
        if (accordingCustomerRequirementsDimensionCalculationsQuery.data?.success) {
            setField("accordingCustomerRequirementsDiameters",
                accordingCustomerRequirementsDimensionCalculationsQuery.data.data.items);
            setField("accordingCustomerRequirementsDimensionCalculations", {
                ...accordingCustomerRequirementsDimensionCalculationsState,
                requiredDiameter: accordingCustomerRequirementsDimensionCalculationsQuery.data.data.items[0]
            });
        }
    }, [accordingCustomerRequirementsDimensionCalculationsQuery.data, setField]);

    // Запрос для acceptedDimensionsDiameters
    const acceptedDiametersQuery = useQuery<AcceptedDiametersResponse, Error>({
        queryKey: QUERY_KEYS.acceptedDimensionsDiameters,
        queryFn: (): Promise<AcceptedDiametersResponse> =>
            getAcceptedDimensionsDiameters(),
    });

    useEffect(() => {
        if (acceptedDiametersQuery.data?.success) {
            setField("acceptedDimensionsDiameters", acceptedDiametersQuery.data.data.items);
            setField("acceptedDimensions", {
                ...acceptedDimensionsState,
                diameter: acceptedDiametersQuery.data.data.items[0]
            });
        }
    }, [acceptedDiametersQuery.data, setField]);

    // Агрегация состояний isLoading и isError для всех запросов
    const isLoading =
        pumpPressureQuery.isLoading ||
        pumpPipeGuidesQuery.isLoading ||
        supplyManifoldQuery.isLoading ||
        pressureCollectorDiametersQuery.isLoading ||
        pressureCollectorCountsQuery.isLoading ||
        customerRequirementsQuery.isLoading ||
        acceptedHeightsQuery.isLoading ||
        acceptedDiametersQuery.isLoading;

    const isError =
        pumpPressureQuery.isError ||
        pumpPipeGuidesQuery.isError ||
        supplyManifoldQuery.isError ||
        pressureCollectorDiametersQuery.isError ||
        pressureCollectorCountsQuery.isError ||
        customerRequirementsQuery.isError ||
        acceptedHeightsQuery.isError ||
        acceptedDiametersQuery.isError;

    return {isLoading, isError};
};
