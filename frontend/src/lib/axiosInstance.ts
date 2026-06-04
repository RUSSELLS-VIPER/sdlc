import axios from "axios";

const isBrowser = typeof window !== "undefined";

const resolveBaseURL = () => {
  const configuredBaseURL = import.meta.env.VITE_LISTING_PROJECT_URL?.trim();

  if (configuredBaseURL) {
    return configuredBaseURL;
  }

  if (import.meta.env.DEV) {
    return "http://localhost:8000";
  }

  if (isBrowser) {
    console.warn(
      "VITE_LISTING_PROJECT_URL is not set. Falling back to the current origin, which must proxy /api requests to the backend.",
    );
    return window.location.origin;
  }

  return "http://localhost:8000";
};

export const axiosInstance = axios.create({
  baseURL: resolveBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
