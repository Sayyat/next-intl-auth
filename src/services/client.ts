import axios from "axios";
import {env} from "@/core/data/env/client";
import {getSession, signOut} from "next-auth/react";

// Create an Axios instance for server-side requests
export const apiClient = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL, // Replace with your API URL
    headers: {"Content-Type": "application/json"},
});


apiClient.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (!session) {
        console.warn("⚠️ No access token available! Request may fail.");
    } else {
        config.headers.Authorization = `Bearer ${session.access}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
    (response) => response, // Return response if successful
    async (error) => {
        if (error.response?.status === 401) {
            console.warn("⚠️ Unauthorized! Signing out...");
            await signOut();
            window.location.href = "/login";  // Redirect to login page
        }
        return Promise.reject(error); // Pass the error to the calling function
    }
);
