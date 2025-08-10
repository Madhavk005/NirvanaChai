import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product as ApiProduct } from "../services/apiService";

// Enhanced Product type that extends API product
export interface ProductInCart extends ApiProduct {
  name: string;
  image: string;
  region: string;
  description: string;
  badges: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  brewTime: string;
  caffeine: string;
  tags: string[];
}

// Cart item type
export interface CartItem extends ProductInCart {
  quantity: number;
  selectedVariant?: string;
  addedAt: string;
}

// Wishlist item type
export interface WishlistItem {
  id: number;
  addedAt: string;
}

// Recently viewed item type
export interface RecentlyViewedItem {
  id: number;
  viewedAt: string;
  product: ProductInCart;
}

// Cart store interface
interface CartStore {
  // Cart state
  items: CartItem[];
  isOpen: boolean;

  // Cart actions
  addItem: (product: ProductInCart, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;

  // Cart computations
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: number) => number;
  getItemSubtotal: (productId: number) => number;
  getCartSummary: () => {
    totalItems: number;
    totalPrice: number;
    itemCount: number;
    savings: number;
  };
}

// Wishlist store interface
interface WishlistStore {
  items: WishlistItem[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

// Recently Viewed store interface
interface RecentlyViewedStore {
  items: RecentlyViewedItem[];
  maxItems: number;
  addItem: (product: ProductInCart) => void;
  removeItem: (productId: number) => void;
  clearRecentlyViewed: () => void;
  getRecentlyViewed: () => RecentlyViewedItem[];
  isRecentlyViewed: (productId: number) => boolean;
}

// UI store interface
interface UIStore {
  // Modal states
  isSearchOpen: boolean;
  isMenuOpen: boolean;
  isFilterOpen: boolean;

  // Loading states
  isLoading: boolean;
  loadingMessage: string;

  // Dark mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;

  // Toast notifications
  notifications: Array<{
    id: string;
    type: "success" | "error" | "info" | "warning";
    message: string;
    timestamp: number;
    duration?: number;
  }>;

  // Actions
  toggleSearch: () => void;
  toggleMenu: () => void;
  toggleFilter: () => void;
  setLoading: (loading: boolean, message?: string) => void;
  addNotification: (
    type: "success" | "error" | "info" | "warning",
    message: string,
    duration?: number,
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// Cart store implementation
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: ProductInCart, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            // Update existing item quantity
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          } else {
            // Add new item
            const newItem: CartItem = {
              ...product,
              quantity,
              addedAt: new Date().toISOString(),
            };
            return {
              items: [...state.items, newItem],
            };
          }
        });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setCartOpen: (isOpen: boolean) => {
        set({ isOpen });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.originalPrice || item.price;
          return total + price * item.quantity;
        }, 0);
      },

      getItemQuantity: (productId: number) => {
        const item = get().items.find((item) => item.id === productId);
        return item?.quantity || 0;
      },

      getItemSubtotal: (productId: number) => {
        const item = get().items.find((item) => item.id === productId);
        if (!item) return 0;
        const price = item.originalPrice || item.price;
        return price * item.quantity;
      },

      getCartSummary: () => {
        const items = get().items;
        const totalItems = items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        const totalPrice = items.reduce((total, item) => {
          const price = item.originalPrice || item.price;
          return total + price * item.quantity;
        }, 0);
        const savings = items.reduce((total, item) => {
          if (item.originalPrice && item.originalPrice > item.price) {
            return total + (item.originalPrice - item.price) * item.quantity;
          }
          return total;
        }, 0);

        return {
          totalItems,
          totalPrice,
          itemCount: items.length,
          savings,
        };
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// Wishlist store implementation
export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId: number) => {
        set((state) => {
          if (state.items.find((item) => item.id === productId)) {
            return state; // Already in wishlist
          }
          return {
            items: [
              ...state.items,
              { id: productId, addedAt: new Date().toISOString() },
            ],
          };
        });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      isInWishlist: (productId: number) => {
        return get().items.some((item) => item.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getWishlistCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// Recently Viewed store implementation
export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],
      maxItems: 20,

      addItem: (product: ProductInCart) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.id === product.id,
          );

          const newItem: RecentlyViewedItem = {
            id: product.id,
            viewedAt: new Date().toISOString(),
            product,
          };

          if (existingIndex !== -1) {
            // Remove existing item and add to front
            const updatedItems = state.items.filter(
              (item) => item.id !== product.id,
            );
            return {
              items: [newItem, ...updatedItems].slice(0, state.maxItems),
            };
          } else {
            // Add new item to front
            return {
              items: [newItem, ...state.items].slice(0, state.maxItems),
            };
          }
        });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      clearRecentlyViewed: () => {
        set({ items: [] });
      },

      getRecentlyViewed: () => {
        return get().items;
      },

      isRecentlyViewed: (productId: number) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "recently-viewed-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// UI store implementation
export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      isSearchOpen: false,
      isMenuOpen: false,
      isFilterOpen: false,
      isLoading: false,
      loadingMessage: "",
      isDarkMode: false,
      notifications: [],

      toggleSearch: () => {
        set((state) => ({ isSearchOpen: !state.isSearchOpen }));
      },

      toggleMenu: () => {
        set((state) => ({ isMenuOpen: !state.isMenuOpen }));
      },

      toggleFilter: () => {
        set((state) => ({ isFilterOpen: !state.isFilterOpen }));
      },

      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
        // Apply dark mode to document
        const isDark = !get().isDarkMode;
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setDarkMode: (isDark: boolean) => {
        set({ isDarkMode: isDark });
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setLoading: (loading: boolean, message = "") => {
        set({ isLoading: loading, loadingMessage: message });
      },

      addNotification: (type, message, duration = 5000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const notification = {
          id,
          type,
          message,
          timestamp: Date.now(),
          duration,
        };

        set((state) => ({
          notifications: [...state.notifications, notification],
        }));

        // Auto-remove notification after duration
        setTimeout(() => {
          get().removeNotification(id);
        }, duration);
      },

      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id,
          ),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({ 
        isDarkMode: state.isDarkMode,
        notifications: state.notifications 
      }),
    },
  ),
);

// Convenience hooks
export const useCartItemCount = () =>
  useCartStore((state) => state.getTotalItems());

export const useCartTotal = () =>
  useCartStore((state) => state.getTotalPrice());

export const useIsInCart = (productId: number) =>
  useCartStore((state) => state.getItemQuantity(productId) > 0);

export const useIsInWishlist = (productId: number) =>
  useWishlistStore((state) => state.isInWishlist(productId));

export const useWishlistCount = () =>
  useWishlistStore((state) => state.getWishlistCount());

export const useCartSummary = () =>
  useCartStore((state) => state.getCartSummary());

export const useRecentlyViewed = () =>
  useRecentlyViewedStore((state) => state.getRecentlyViewed());

export const useIsRecentlyViewed = (productId: number) =>
  useRecentlyViewedStore((state) => state.isRecentlyViewed(productId));

export const useDarkMode = () =>
  useUIStore((state) => state.isDarkMode);

export const useToggleDarkMode = () =>
  useUIStore((state) => state.toggleDarkMode);