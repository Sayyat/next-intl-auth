import axios from "axios";
import {env} from "@/core/data/env/server";

export const apiClient = axios.create({
    baseURL: env.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

