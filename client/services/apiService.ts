import axios, { AxiosInstance, AxiosResponse } from "axios";

// Types
export interface Product {
  id: number;
  productNameCatalog: string;
  productNameEnglish: string;
  weight: string;
  price: number;
  composition: string;
  taste: string;
  teaType: string;
  productType: string;
  shelfLife: string;
  origin: string;
  category: string;
  badges?: string[];
  image?: string;
  originalPrice?: number;
  currentPriceINR?: number;
  originalPriceINR?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  filters: {
    applied: Record<string, any>;
    available: {
      categories: string[];
      origins: string[];
    };
  };
  data: T[];
}

export interface ProductFilters {
  category?: string;
  origin?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("API Request URL:", this.api.defaults.baseURL + config.url);
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }

  // Generic request method
  private async request<T>(config: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api(config);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new Error(error.response.data.message || "API request failed");
      }
      throw new Error(error.message || "Network error");
    }
  }

  // Product endpoints
  async getProducts(
    filters?: ProductFilters,
  ): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });
    }

    return this.request<ApiResponse<PaginatedResponse<Product>>>({
      method: "GET",
      url: `/products?${params.toString()}`,
    });
  }

  async getProductById(id: number): Promise<ApiResponse<Product>> {
    return this.request<ApiResponse<Product>>({
      method: "GET",
      url: `/products/${id}`,
    });
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    return this.request<ApiResponse<string[]>>({
      method: "GET",
      url: "/products/categories",
    });
  }

  async getOrigins(): Promise<ApiResponse<string[]>> {
    return this.request<ApiResponse<string[]>>({
      method: "GET",
      url: "/products/origins",
    });
  }

  // Health check
  async healthCheck(): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>({
      method: "GET",
      url: "/health",
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();