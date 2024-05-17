import { axiosInstance } from "../axios";
import useAuth from "./useAuth";

export default function useRefreshToken() {
    const { setAccessToken, setCSRFToken } = useAuth()

    const refresh = async () => {
        const response = await axiosInstance.post('auth/refresh-token')
        console.log("response", response)
        setAccessToken(response.data.access_token)
        setCSRFToken(response.headers["x-csrftoken"])

        return { accessToken: response.data.access, csrfToken: response.headers["x-csrftoken"] }
    }

    return refresh
}