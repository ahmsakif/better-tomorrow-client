import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://better-tomorrow-server.vercel.app'
    // baseURL: 'http://localhost:3000'
})

const useAxios = () => {
    return axiosInstance
}

export default useAxios

// 'http://localhost:3000'
// 'https://better-tomorrow-server.vercel.app'