import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE
  // fallback: "http://localhost:8003"
});

export default axiosInstance;