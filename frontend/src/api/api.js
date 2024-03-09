import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

// Create an Axios instance
const api = axios.create({
  baseURL: BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the auth token
api.interceptors.request.use(
  (config) => {
    // Get the auth token from the store
    const authToken = useAuthStore.getState().token;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
