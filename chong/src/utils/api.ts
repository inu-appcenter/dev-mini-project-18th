import axios from "redaxios";

export const api = axios.create({
    baseURL: "/api/proxy",
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: () => true,
});
