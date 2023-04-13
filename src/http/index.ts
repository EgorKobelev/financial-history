import axios from "axios";

export const API_URL = "http://localhost:5216/api/v1/public/Authorize/";

const $api = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
    },
});

$api.interceptors.request.use((config) => {
    config.headers.token = localStorage.getItem("accessToken");
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalConfig = error.config
    try {
        const response = await axios.post(`${API_URL}refreshAccessToken`, null, {withCredentials: true})
        localStorage.setItem('accessToken', response.data.accessToken)
        return $api.request(originalConfig)
    } catch {
        console.log("Срок действия refresh истек")
    }
});

export default $api;
