import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {env} from "@/core/data/env/client";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function toAbsolutePath(path: string): string {
    const baseUrl = env.NEXT_PUBLIC_API_URL;
    return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export function waitForSeconds(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}