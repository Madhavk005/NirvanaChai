import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, X, ArrowRight } from 'lucide-react';
import { useRecentlyViewed, useRecentlyViewedStore } from '../stores/useStore';
import { ProductInCart } from '../stores/useStore';

interface RecentlyViewedProps {
  onProductClick: (product: ProductInCart) => void;
  maxItems?: number;
  showTitle?: boolean;
  className?: string;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  onProductClick,
  maxItems = 4,
  showTitle = true,
  className = '',
}) => {
  const { t } = useTranslation();
  const recentlyViewed = useRecentlyViewed();
  const { removeItem, clearRecentlyViewed } = useRecentlyViewedStore();

  const displayedItems = recentlyViewed.slice(0, maxItems);

  if (displayedItems.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recently Viewed
            </h3>
          </div>
          {recentlyViewed.length > maxItems && (
            <button
              onClick={clearRecentlyViewed}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence>
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1 
              }}
              className="group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.id);
                }}
                className="absolute top-2 right-2 z-10 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <X className="h-3 w-3 text-gray-500 hover:text-red-500" />
              </button>

              {/* Product image */}
              <div 
                className="relative aspect-square cursor-pointer overflow-hidden"
                onClick={() => onProductClick(item.product)}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
                  >
                    <ArrowRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </motion.div>
                </div>
              </div>

              {/* Product info */}
              <div className="p-3">
                <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {item.product.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.product.region}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-sage-600 dark:text-sage-400">
                    ${item.product.price}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.viewedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View all button */}
      {recentlyViewed.length > maxItems && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <button
            onClick={() => {
              // This could navigate to a full recently viewed page
              console.log('View all recently viewed');
            }}
            className="inline-flex items-center space-x-2 text-sage-600 dark:text-sage-400 hover:text-sage-700 dark:hover:text-sage-300 transition-colors"
          >
            <span className="text-sm font-medium">
              View all {recentlyViewed.length} items
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default RecentlyViewed; 