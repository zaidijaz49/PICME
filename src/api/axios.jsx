import axios from "axios";

const api = axios.create({
  baseURL: "https://api-dev.thepicmeapp.com",
});

// This runs BEFORE every request automatically
api.interceptors.request.use((config) => {
  // Check localStorage first (remember me), then sessionStorage
  const token =
    localStorage.getItem("authToken") ||
    sessionStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// This runs AFTER every response automatically
api.interceptors.response.use(
  (response) => response, // success — just return it

  (error) => {
    // If token expired or invalid → logout user
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      window.location.href = "/signin"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;