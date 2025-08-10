import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  ArrowUpDown,
  ChevronDown,
  X,
  SlidersHorizontal,
  Tag,
  MapPin,
  Clock,
  Zap,
  Loader2,
} from "lucide-react";
import { useRecentlyViewedStore } from "../stores/useStore";
import SearchAutocomplete from "../components/SearchAutocomplete";
import RecentlyViewed from "../components/RecentlyViewed";

import { motion, AnimatePresence } from "framer-motion";

import { useLanguageCurrency } from "../contexts/LanguageCurrencyContext";
import {
  useSimpleAnimation,
} from "../hooks/useSimpleAnimation";
import {
  useCartStore,
  useWishlistStore,
  ProductInCart,
} from "../stores/useStore";

import { showToast } from "../components/Toast/ToastProvider";
import { useProducts, useCategories, useOrigins } from "../hooks/useProducts";
import { Product } from "../services/apiService";

export default function Shop() {
  const { formatPrice, currentCurrency } = useLanguageCurrency();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOrigin, setSelectedOrigin] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // API hooks
  const {
    data: productsData,
    isLoading,
    error,
  } = useProducts({
    search: debouncedSearchTerm || undefined,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
    origin: selectedOrigin !== "all" ? selectedOrigin : undefined,
    minPrice: priceRange[0] || undefined,
    maxPrice: priceRange[1] || undefined,
    sortBy,
    sortOrder,
    page: currentPage,
    limit: 20,
  });

  const { data: categoriesData } = useCategories();
  const { data: originsData } = useOrigins();

  // Store hooks
  const { addItem, getItemQuantity } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const { addItem: addToRecentlyViewed } = useRecentlyViewedStore();

  // Animation hooks
  const heroAnimation = useSimpleAnimation();
  const statsAnimation = useSimpleAnimation();
  const filtersAnimation = useSimpleAnimation();
  const productsAnimation = useSimpleAnimation();

  // Memoized data
  const products = useMemo(() => {
    if (productsData?.data?.data && Array.isArray(productsData.data.data)) {
      return productsData.data.data;
    }
    return [];
  }, [productsData]);
  
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData],
  );
  const origins = useMemo(() => originsData?.data || [], [originsData]);
  const pagination = useMemo(() => {
    if (productsData?.data && productsData.data.pagination) {
      return productsData.data.pagination;
    }
    return undefined;
  }, [productsData]);

  // Enhanced categories with counts
  const categoriesWithCounts = useMemo(() => {
    const categoryCounts = products.reduce(
      (acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return [
      {
        id: "all",
        name: "All Teas",
        count: products.length,
        color: "bg-sage-100 text-sage-700",
      },
      ...categories.map((cat) => ({
        id: cat.toLowerCase(),
        name: cat,
        count: categoryCounts[cat] || 0,
        color: getCategoryColor(cat),
      })),
    ];
  }, [categories, products]);

  // Enhanced origins with counts
  const originsWithCounts = useMemo(() => {
    const originCounts = products.reduce(
      (acc, product) => {
        acc[product.origin] = (acc[product.origin] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return [
      {
        id: "all",
        name: "All Origins",
        count: products.length,
        color: "bg-sage-100 text-sage-700",
      },
      ...origins.map((origin) => ({
        id: origin.toLowerCase(),
        name: origin,
        count: originCounts[origin] || 0,
        color: getOriginColor(origin),
      })),
    ];
  }, [origins, products]);

  // Utility functions
  function getCategoryColor(category: string): string {
    const colors = {
      "Black Tea": "bg-amber-100 text-amber-700",
      "Green Tea": "bg-emerald-100 text-emerald-700",
      "Flavored Tea": "bg-purple-100 text-purple-700",
      default: "bg-gray-100 text-gray-700",
    };
    return colors[category as keyof typeof colors] || colors.default;
  }

  function getOriginColor(origin: string): string {
    const colors = {
      India: "bg-orange-100 text-orange-700",
      Kenya: "bg-green-100 text-green-700",
      China: "bg-red-100 text-red-700",
      default: "bg-blue-100 text-blue-700",
    };
    return colors[origin as keyof typeof colors] || colors.default;
  }

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedOrigin("all");
    setPriceRange([0, 2000]);
    setSortBy("id");
    setSortOrder("asc");
    setCurrentPage(1);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast.info("Removed from wishlist");
    } else {
      addToWishlist(product.id);
      showToast.success("Added to wishlist");
    }
  };

  const addToCart = (product: Product) => {
    const productInCart: ProductInCart = {
        ...product,
        name: product.productNameEnglish,
        image: product.image || "",
        region: product.origin,
        description: product.composition,
        badges: product.badges || [],
        inStock: true,
        rating: 0,
        reviews: 0,
        brewTime: "",
        caffeine: "",
        tags: [],
      };
    addItem(productInCart, 1);
    addToRecentlyViewed(productInCart);
    showToast.success(`${product.productNameEnglish} added to cart`);
  };

  const handleProductView = (product: Product) => {
    const productInCart: ProductInCart = {
        ...product,
        name: product.productNameEnglish,
        image: product.image || "",
        region: product.origin,
        description: product.composition,
        badges: product.badges || [],
        inStock: true,
        rating: 0,
        reviews: 0,
        brewTime: "",
        caffeine: "",
        tags: [],
      };
    addToRecentlyViewed(productInCart);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleOriginChange = (origin: string) => {
    setSelectedOrigin(origin);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    setCurrentPage(1);
  };

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  // Loading state
  if (isLoading && !products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-sage-600" />
          <p className="text-sage-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <X className="h-8 w-8 mx-auto mb-4 text-red-600" />
          <p className="text-red-600">Failed to load products</p>
          <p className="text-sm text-gray-500 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sage-50 to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" {...heroAnimation}>
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900 mb-4">
              Discover Our Premium Tea Collection
            </h1>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              From the finest tea gardens around the world, carefully selected
              and expertly crafted for your perfect cup.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            {...statsAnimation}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600">
                {products.length}
              </div>
              <div className="text-sm text-sage-600">Premium Teas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600">
                {categories.length}
              </div>
              <div className="text-sm text-sage-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600">
                {origins.length}
              </div>
              <div className="text-sm text-sage-600">Origins</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sage-600">100%</div>
              <div className="text-sm text-sage-600">Natural</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col lg:flex-row gap-6 items-start"
            {...filtersAnimation}
          >
            {/* Search Bar */}
            <div className="flex-1 relative">
              <SearchAutocomplete
                products={products.map(product => ({
                  ...product,
                  name: product.productNameEnglish,
                  image: product.image || "",
                  region: product.origin,
                  description: product.composition,
                  badges: product.badges || [],
                  inStock: true,
                  rating: 0,
                  reviews: 0,
                  brewTime: "",
                  caffeine: "",
                  tags: [],
                }))}
                onProductSelect={(product) => {
                  handleProductView(product as unknown as Product);
                  // In a real app, this would navigate to the product detail page
                  console.log('Selected product:', product.name);
                }}
                onSearch={handleSearch}
                placeholder="Search teas..."
                className="w-full"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-sage-100 text-sage-700"
                    : "bg-white text-gray-400 hover:text-gray-600"
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-sage-100 text-sage-700"
                    : "bg-white text-gray-400 hover:text-gray-600"
                }`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              aria-expanded={showFilters}
              aria-controls="filter-panel"
              aria-label="Toggle filters"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </motion.div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                id="filter-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categoriesWithCounts.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === category.id
                              ? "bg-sage-100 text-sage-700"
                              : "hover:bg-gray-50"
                          }`}
                          aria-pressed={selectedCategory === category.id}
                        >
                          <span>{category.name}</span>
                          <span className="ml-2 text-gray-500">
                            ({category.count})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Origins */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Origins
                    </h3>
                    <div className="space-y-2">
                      {originsWithCounts.map((origin) => (
                        <button
                          key={origin.id}
                          onClick={() => handleOriginChange(origin.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedOrigin === origin.id
                              ? "bg-sage-100 text-sage-700"
                              : "hover:bg-gray-50"
                          }`}
                          aria-pressed={selectedOrigin === origin.id}
                        >
                          <span>{origin.name}</span>
                          <span className="ml-2 text-gray-500">
                            ({origin.count})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            handlePriceRangeChange([
                              Number(e.target.value),
                              priceRange[1],
                            ])
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Min"
                          aria-label="Minimum price"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            handlePriceRangeChange([
                              priceRange[0],
                              Number(e.target.value),
                            ])
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Max"
                          aria-label="Maximum price"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Sort By
                    </h3>
                    <div className="space-y-2">
                      {[
                        { value: "id", label: "Featured" },
                        { value: "price", label: "Price" },
                        { value: "productNameEnglish", label: "Name" },
                        { value: "origin", label: "Origin" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            sortBy === option.value
                              ? "bg-sage-100 text-sage-700"
                              : "hover:bg-gray-50"
                          }`}
                          aria-pressed={sortBy === option.value}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option.label}</span>
                            {sortBy === option.value && (
                              <ArrowUpDown className="h-4 w-4" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={clearFilters}
                      className="text-sage-600 hover:text-sage-700 text-sm font-medium"
                      aria-label="Clear all filters"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Recently Viewed Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecentlyViewed
            onProductClick={(product) => {
              // In a real app, this would navigate to the product detail page
              console.log('Viewing recently viewed product:', product.productNameEnglish);
            }}
            maxItems={4}
            showTitle={true}
          />
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            {...productsAnimation}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                onViewProduct={handleProductView}
                isInWishlist={isInWishlist(product.id)}
                quantity={getItemQuantity(product.id)}
                formatPrice={formatPrice}
              />
            ))}
          </motion.div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  aria-label="Previous page"
                >
                  Previous
                </button>

                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 border rounded-lg ${
                      currentPage === page
                        ? "bg-sage-600 text-white border-sage-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    aria-current={currentPage === page ? "page" : undefined}
                    aria-label={`Page ${page}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(pagination.totalPages, currentPage + 1),
                    )
                  }
                  disabled={currentPage === pagination.totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* No Results */}
          {products.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Tag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700"
                aria-label="Clear filters"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  isInWishlist: boolean;
  quantity: number;
  formatPrice: (price: number) => string;
}

function ProductCard({
  product,
  viewMode,
  onAddToCart,
  onToggleWishlist,
  onViewProduct,
  isInWishlist,
  quantity,
  formatPrice,
}: ProductCardProps) {
  const cardClass =
    viewMode === "list" ? "flex flex-row space-x-4 p-4" : "flex flex-col p-4";

  return (
    <motion.div
      layout
      className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${cardClass}`}
      whileHover={{ y: -2 }}
    >
      {/* Product Image */}
      <div
        className={`relative ${viewMode === "list" ? "w-32 h-32" : "w-full h-48"}`}
      >
        <div 
          className="w-full h-full bg-gradient-to-br from-sage-100 to-emerald-100 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onViewProduct(product)}
        >
          <span className="text-4xl">🍃</span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
            isInWishlist
              ? "bg-red-500 text-white"
              : "bg-white text-gray-400 hover:text-red-500"
          }`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-2 left-2">
            {product.badges.map((badge, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs font-medium bg-sage-600 text-white rounded mr-1"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`flex-1 ${viewMode === "list" ? "ml-4" : "mt-4"}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {product.productNameEnglish}
          </h3>
        </div>

        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.composition}
        </p>

        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {product.origin}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
            <span className="text-sm text-gray-500">(24)</span>
          </div>
          <span className="text-sm text-gray-500">{product.weight}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-sage-900 flex flex-col">
            <span>{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.currentPriceINR && product.originalPriceINR && (
              <span className="text-sm text-gray-600 mt-1">
                ₹{product.currentPriceINR.toFixed(2)}{" "}
                {product.originalPriceINR > product.currentPriceINR && (
                  <span className="line-through text-gray-400">
                    ₹{product.originalPriceINR.toFixed(2)}
                  </span>
                )}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {quantity > 0 && (
              <span className="text-sm text-sage-600">{quantity} in cart</span>
            )}
            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center space-x-1 px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
              aria-label={`Add ${product.productNameEnglish} to cart`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm">Add</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}