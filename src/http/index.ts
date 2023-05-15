import axios from "axios";

export const API_URL = "http://localhost:5216/api/v1/public";

const $api = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
    },
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem("accessToken");
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalConfig = error.config;
        if (error.response.status === 403) {
            try {
                const response = await axios.patch(`${API_URL}/Authorize/refreshAccessToken`, null, {
                    withCredentials: true,
                });
                localStorage.setItem("accessToken", response.data.accessToken);
                return $api.request(originalConfig);
            } catch {
                console.log("Срок действия refresh истек");
            }
        }
    }
);

export default $api;
