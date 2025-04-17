export type TActivity =
    | "IMPLEMENTATION"
    | "DESIGNING";


export interface IActivityOption {
    label: string;
    activity: TActivity;
}

