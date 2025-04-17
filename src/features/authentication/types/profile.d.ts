import {ICity} from "@/features/common/city"

export interface IProfile {
    email: string,
    firstname: string,
    lastname: string,
    phone_number: string,
    organization_name: string,
    city: ICity,
    image_url: string,
    is_superuser: boolean,
    created_at: string,
    updated_at: string,
}
