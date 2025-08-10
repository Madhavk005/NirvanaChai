import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Heart, Trash2, ShoppingCart, Eye } from 'lucide-react';
import { useWishlistStore, useCartStore } from '../stores/useStore';
import { ProductInCart } from '../stores/useStore';

interface WishlistProps {
  products: ProductInCart[];
  onProductClick: (product: ProductInCart) => void;
  maxItems?: number;
  showTitle?: boolean;
  className?: string;
}

const Wishlist: React.FC<WishlistProps> = ({
  products,
  onProductClick,
  maxItems,
  showTitle = true,
  className = '',
}) => {
  const { t } = useTranslation();
  const { items: wishlistItems, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  // Filter products that are in wishlist
  const wishlistProducts = products.filter(product => 
    wishlistItems.some(item => item.id === product.id)
  );

  const displayedItems = maxItems ? wishlistProducts.slice(0, maxItems) : wishlistProducts;

  if (displayedItems.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Start adding your favorite teas to your wishlist
        </p>
      </div>
    );
  }

  const handleAddToCart = (product: ProductInCart) => {
    addItem(product, 1);
    // You could show a toast notification here
  };

  const handleRemoveFromWishlist = (productId: number) => {
    removeItem(productId);
    // You could show a toast notification here
  };

  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-red-500 fill-current" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Wishlist ({wishlistProducts.length})
            </h3>
          </div>
          {wishlistProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors flex items-center space-x-1"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear all</span>
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {displayedItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1 
              }}
              className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Product image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Badges */}
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {product.badges.slice(0, 2).map((badge, badgeIndex) => (
                      <span
                        key={badgeIndex}
                        className="px-2 py-1 text-xs font-medium bg-sage-500 text-white rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action buttons overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    onClick={() => onProductClick(product)}
                    className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Eye className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    onClick={() => handleAddToCart(product)}
                    className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </motion.button>
                </div>

                {/* Remove from wishlist button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </button>
              </div>

              {/* Product info */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {product.region}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Product details */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span>Brew: {product.brewTime}</span>
                  <span>Caffeine: {product.caffeine}</span>
                </div>

                {/* Price and rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-sage-600 dark:text-sage-400">
                      ${product.price}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-500">★</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Stock status */}
                <div className="mt-3">
                  {product.inStock ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View all button */}
      {maxItems && wishlistProducts.length > maxItems && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <button
            onClick={() => {
              // This could navigate to a full wishlist page
              console.log('View all wishlist items');
            }}
            className="inline-flex items-center space-x-2 text-sage-600 dark:text-sage-400 hover:text-sage-700 dark:hover:text-sage-300 transition-colors"
          >
            <span className="text-sm font-medium">
              View all {wishlistProducts.length} wishlist items
            </span>
            <Eye className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Wishlist; 