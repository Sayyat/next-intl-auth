export interface IRegisterPayload {
    email: string,
    firstname: string,
    lastname: string,
    phone_number: string,
    organization_name: string,
    city_id: number,
    password: string,
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IResetPayload {
    email: string;
}

export interface IResetResponse {
    message: string;
}