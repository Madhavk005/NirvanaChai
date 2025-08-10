import React from 'react';
import { motion } from 'framer-motion';
import Wishlist from '../components/Wishlist';
import { ProductInCart } from '../stores/useStore';

const WishlistPage: React.FC = () => {

  // Sample products (in a real app, this would come from an API)
  const sampleProducts: ProductInCart[] = [
    {
        id: 1,
        productNameCatalog: "Darjeeling First Flush",
        productNameEnglish: "Darjeeling First Flush",
        description: "A delicate and aromatic first flush tea with floral notes and a light golden color. This premium tea is harvested in the early spring and offers a unique muscatel flavor profile.",
        price: 24.99,
        image: "/placeholder.svg",
        category: "Black Tea",
        inStock: true,
        rating: 4.8,
        reviews: 127,
        tags: ["black", "first-flush", "floral", "premium"],
        weight: "100g",
        origin: "Darjeeling, India",
        composition: "100% Darjeeling Black Tea",
        shelfLife: "2 years",
        name: "Darjeeling First Flush",
        region: "Darjeeling, India",
        badges: ["Premium", "Limited"],
        brewTime: "3-4 min",
        caffeine: "Medium",
        taste: "Floral",
        teaType: "Black",
        productType: "Tea",
    },
    {
        id: 2,
        productNameCatalog: "Assam Breakfast Blend",
        productNameEnglish: "Assam Breakfast Blend",
        description: "A robust and malty breakfast tea perfect for starting your day with energy. This full-bodied tea has a rich, deep flavor with hints of malt and chocolate.",
        price: 18.99,
        image: "/placeholder.svg",
        category: "Black Tea",
        inStock: true,
        rating: 4.6,
        reviews: 89,
        tags: ["black", "breakfast", "malty", "robust"],
        weight: "100g",
        origin: "Assam, India",
        composition: "100% Assam Black Tea",
        shelfLife: "2 years",
        name: "Assam Breakfast Blend",
        region: "Assam, India",
        badges: ["Bestseller"],
        brewTime: "4-5 min",
        caffeine: "High",
        taste: "Malty",
        teaType: "Black",
        productType: "Tea",
    },
  ];

  const handleProductClick = (product: ProductInCart) => {
    // In a real app, this would navigate to the product detail page
    console.log('Viewing product:', product.productNameEnglish);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sage-600 to-chai-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Your Wishlist
            </h1>
            <p className="text-xl text-sage-100 max-w-2xl mx-auto">
              Keep track of your favorite teas and discover new ones you've saved for later
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Wishlist
          products={sampleProducts}
          onProductClick={handleProductClick}
          showTitle={false}
        />
      </div>

      {/* Empty State (shown when no wishlist items) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <div className="text-sage-300 mb-6">
              <svg className="h-24 w-24 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start exploring our collection and add your favorite teas to your wishlist
            </p>
            <button className="bg-sage-600 text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition-colors font-medium">
              Browse Our Collection
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WishlistPage;