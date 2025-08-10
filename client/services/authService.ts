import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:5001/api/auth";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error);
    
    // Handle network errors
    if (!error.response) {
      console.error("Network Error: The server might be unreachable");
      throw new Error("Network Error: Unable to connect to the server. Please check your connection and ensure the server is running.");
    }
    
    // Handle specific HTTP errors
    switch (error.response.status) {
      case 400:
        throw new Error("Bad Request: Please check your input data");
      case 401:
        throw new Error("Unauthorized: Invalid credentials");
      case 403:
        throw new Error("Forbidden: Access denied");
      case 404:
        throw new Error("Not Found: The requested resource could not be found");
      case 409:
        throw new Error("Conflict: User already exists");
      case 500:
        throw new Error("Internal Server Error: Something went wrong on the server");
      default:
        throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
    }
  }
);

export async function login(email: string, password: string) {
  try {
    const response = await apiClient.post("/login", { email, password });
    localStorage.setItem("authToken", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function register(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    const response = await apiClient.post("/register", userData);
    localStorage.setItem("authToken", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await apiClient.post("/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const response = await apiClient.get("/me");
    return response.data;
  } catch (error) {
    console.error("Get current user error:", error);
    throw error;
  }
}
