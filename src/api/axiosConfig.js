import axios from "axios";
const url = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: url, 
  timeout: 20000, 
  headers: {
    "Content-Type": "application/json",
  },
  // "Access-Control-Allow-Origin" : '*',
  withCredentials: true,
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

export default axiosInstance;
