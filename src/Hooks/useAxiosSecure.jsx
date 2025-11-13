import axios from "axios";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: "http://localhost:3000"
});

axiosSecure.interceptors.request.use(async (config) => {
    const { user } = useAuth();
console.log(user);
    if (user) {
        const token = await user.accessToken();
        console.log(token);
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosSecure;
