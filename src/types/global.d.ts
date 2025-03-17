export interface IBaseUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    status: string | null;
    image: string | null;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
}

export interface IUser extends IBaseUser {
    access: string;
    refresh: string;
}

export interface IStatus {
    label: string,
    value: string;
}
