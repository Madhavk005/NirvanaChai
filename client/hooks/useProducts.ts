import { useQuery, useInfiniteQuery, UseQueryResult, UseInfiniteQueryResult } from "@tanstack/react-query";
import {
  apiService,
  Product,
  ProductFilters,
  PaginatedResponse,
  ApiResponse,
} from "../services/apiService";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, "categories"] as const,
  origins: () => [...productKeys.all, "origins"] as const,
};

// Hook for fetching products with filters
export const useProducts = (filters?: ProductFilters): UseQueryResult<ApiResponse<PaginatedResponse<Product>>, Error> => {
  return useQuery({
    queryKey: productKeys.list(filters || {}),
    queryFn: () => apiService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for infinite scrolling products
export const useInfiniteProducts = (filters?: Omit<ProductFilters, "page">): UseInfiniteQueryResult<ApiResponse<PaginatedResponse<Product>>, Error> => {
  return useInfiniteQuery({
    queryKey: productKeys.list(filters || {}),
    queryFn: ({ pageParam = 1 }) =>
      apiService.getProducts({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.data.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook for fetching a single product
export const useProduct = (id: number): UseQueryResult<ApiResponse<Product>, Error> => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => apiService.getProductById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for fetching categories
export const useCategories = (): UseQueryResult<ApiResponse<string[]>, Error> => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: () => apiService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

// Hook for fetching origins
export const useOrigins = (): UseQueryResult<ApiResponse<string[]>, Error> => {
  return useQuery({
    queryKey: productKeys.origins(),
    queryFn: () => apiService.getOrigins(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

// Hook for health check
export const useHealthCheck = (): UseQueryResult<unknown, Error> => {
  return useQuery({
    queryKey: ["health"],
    queryFn: () => apiService.healthCheck(),
    refetchInterval: 30 * 1000, // Check every 30 seconds
    retry: 3,
  });
};

// Utility hook for product search
export const useProductSearch = (searchTerm: string): UseQueryResult<ApiResponse<PaginatedResponse<Product>>, Error> => {
  return useProducts({
    search: searchTerm,
    limit: 20,
  });
};

// Utility hook for category products
export const useCategoryProducts = (category: string): UseQueryResult<ApiResponse<PaginatedResponse<Product>>, Error> => {
  return useProducts({
    category,
    limit: 20,
  });
};

// Utility hook for origin products
export const useOriginProducts = (origin: string): UseQueryResult<ApiResponse<PaginatedResponse<Product>>, Error> => {
  return useProducts({
    origin,
    limit: 20,
  });
};
