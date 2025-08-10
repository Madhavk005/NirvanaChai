import "./global.css";
import "./i18n";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ToastProvider } from "./components/Toast/ToastProvider";
import { CartDrawer } from "./components/Cart/CartDrawer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import { LanguageCurrencyProvider } from "./contexts/LanguageCurrencyContext";
import { Layout } from "./components/Layout";
import { ElegantLoader } from "./components/ElegantLoader";
import { ErrorBoundary } from "./components/ErrorBoundary";
import React, { useState, useEffect, Suspense } from "react";
import { locationService } from "./services/locationService";
import { useHealthCheck } from "./hooks/useProducts";

// Lazy load pages for better performance
const Index = React.lazy(() => import("./pages/Index"));
const Shop = React.lazy(() => import("./pages/Shop"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Account = React.lazy(() => import("./pages/Account"));
const Cart = React.lazy(() => import("./pages/Cart"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Shipping = React.lazy(() => import("./pages/Shipping"));
const Returns = React.lazy(() => import("./pages/Returns"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PlaceholderPage = React.lazy(() => import("./pages/PlaceholderPage"));
const Wishlist = React.lazy(() => import("./pages/Wishlist"));

// Create a stable QueryClient instance

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: 1,
    },
  },
});

// Loading component for Suspense
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-600 mx-auto mb-4"></div>
        <p className="text-sage-600">Loading page...</p>
      </div>
    </div>
  );
}

// Health check component
function HealthCheck() {
  const { data, isLoading, error } = useHealthCheck();

  if (isLoading) return null;

  if (error) {
    console.warn("API health check failed:", error);
  }

  return null;
}

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initializationError, setInitializationError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("Initialization started: detecting location...");
        // Detect user location for personalization
        await locationService.detectLocation();
        console.log("Location detected successfully.");

        // Simulate minimum loading time for smooth experience
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Minimum loading time elapsed.");

        setIsLoading(false);
        console.log("isLoading set to false.");
      } catch (error) {
        console.error("Initialization error:", error);
        setInitializationError(
          error instanceof Error ? error.message : "Initialization failed",
        );
        // Still proceed even if location detection fails
        setTimeout(() => {
          setIsLoading(false);
          console.log("isLoading set to false after error.");
        }, 2000);
      }
    };

    initializeApp();
  }, []);

  // Show error state if initialization failed
  if (initializationError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Initialization Error
          </h2>
          <p className="text-gray-600 mb-4">{initializationError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ToastProvider />
        <AuthProvider>
          <LanguageCurrencyProvider>
            <HealthCheck />
            <ElegantLoader
              isLoading={isLoading}
              onComplete={() => {
                console.log("ElegantLoader onComplete called.");
                setIsLoading(false);
              }}
            />
            <CartDrawer />
            <BrowserRouter>
              <ErrorBoundary>
                <Layout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/shipping" element={<Shipping />} />
                      <Route path="/returns" element={<Returns />} />
                      <Route
                        path="/privacy"
                        element={
                          <PlaceholderPage
                            title="Privacy Policy"
                            description="How we protect and use your personal information."
                          />
                        }
                      />
                      <Route
                        path="/terms"
                        element={
                          <PlaceholderPage
                            title="Terms of Service"
                            description="Our terms and conditions for using this website."
                          />
                        }
                      />
                      <Route path="/wishlist" element={<Wishlist />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </ErrorBoundary>
            </BrowserRouter>
          </LanguageCurrencyProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
