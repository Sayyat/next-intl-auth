import {IBaseUser} from "@/types/global";  // Import your IUser type

declare module "next-auth" {
    interface Session {
        user: IBaseUser;
        access: string;
    }

    interface JWT {
        access: string;
        refresh: string;
        user: IBaseUser; // Store your custom user data in JWT
    }
}
