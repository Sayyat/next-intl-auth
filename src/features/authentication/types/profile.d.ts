import {ICity} from "@/features/common/city"

export interface IProfile {
    firstname: string,
    lastname: string,
    middle_name: string,
    birthdate: string,
    iin: string,
    phone_number: ICity,
    email: string,
    image: boolean,
    city: string,
    address: string,
    is_active: string,
    is_staff: string,
    created_at: string,
    updated_at: string,
}
