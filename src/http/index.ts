import axios from 'axios'

export const API_URL = 'http://localhost:5216/api/v1/public/Authorize/'


const $api = axios.create(
    {
        // withCredentials: true,
    baseURL: API_URL,
    headers: {
        Accept: 'application/json'
    },
    timeout: 0
    }
)

 $api.interceptors.request.use((config) => {
    config.headers.token = localStorage.getItem('accessToken')
    return config
 })

export default $api