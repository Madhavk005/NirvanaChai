import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  Settings,
  Globe,
  Bell
} from 'lucide-react';
import { atom, useAtom } from 'jotai';

// Import our custom components
import SearchAutocomplete from './SearchAutocomplete';
import RecentlyViewed from './RecentlyViewed';
import Wishlist from './Wishlist';
import { ToastProvider } from './Toast/ToastProvider';

// Import Zustand stores
import { 
  useCartStore, 
  useWishlistStore, 
  useRecentlyViewedStore,
  ProductInCart 
} from '../stores/useStore';

// Jotai atoms for additional state management
const searchQueryAtom = atom('');
const selectedLanguageAtom = atom('en');
const notificationsAtom = atom<Array<{id: string; message: string; type: 'info' | 'success' | 'warning' | 'error'}>>([]);

const sampleProducts: ProductInCart[] = [
    {
        id: 1,
        productNameCatalog: "Classic Black Tea",
        productNameEnglish: "Classic Black Tea",
        description: "A classic black tea with a rich, bold flavor.",
        price: 10.99,
        image: "/placeholder.svg",
        category: "Black Tea",
        inStock: true,
        rating: 4.5,
        reviews: 100,
        tags: ["classic", "black tea"],
        weight: "100g",
        origin: "Sri Lanka",
        composition: "100% Black Tea",
        shelfLife: "2 years",
        name: "Classic Black Tea",
        region: "Sri Lanka",
        badges: [],
        brewTime: "3-5 min",
        caffeine: "High",
        taste: "Bold",
        teaType: "Black",
        productType: "Tea",
    },
    {
        id: 2,
        productNameCatalog: "Green Tea with Jasmine",
        productNameEnglish: "Green Tea with Jasmine",
        description: "A delicate green tea infused with jasmine flowers.",
        price: 12.99,
        image: "/placeholder.svg",
        category: "Green Tea",
        inStock: true,
        rating: 4.7,
        reviews: 150,
        tags: ["green tea", "jasmine"],
        weight: "100g",
        origin: "China",
        composition: "Green Tea, Jasmine Flowers",
        shelfLife: "2 years",
        name: "Green Tea with Jasmine",
        region: "China",
        badges: [],
        brewTime: "2-3 min",
        caffeine: "Medium",
        taste: "Floral",
        teaType: "Green",
        productType: "Tea",
    },
    {
        id: 3,
        productNameCatalog: "Herbal Chamomile Tea",
        productNameEnglish: "Herbal Chamomile Tea",
        description: "A calming herbal tea made from chamomile flowers.",
        price: 8.99,
        image: "/placeholder.svg",
        category: "Herbal Tea",
        inStock: true,
        rating: 4.8,
        reviews: 200,
        tags: ["herbal", "chamomile", "caffeine-free"],
        weight: "50g",
        origin: "Egypt",
        composition: "100% Chamomile Flowers",
        shelfLife: "2 years",
        name: "Herbal Chamomile Tea",
        region: "Egypt",
        badges: [],
        brewTime: "5-7 min",
        caffeine: "None",
        taste: "Sweet",
        teaType: "Herbal",
        productType: "Tea",
    }
];

const IntegratedFeatures: React.FC = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const [activeTab, setActiveTab] = React.useState<'search' | 'wishlist' | 'recent' | 'demo'>('demo');

  // Zustand stores
  const { addItem: addToCart, getTotalItems: cartItemCount } = useCartStore();
  const { addItem: addToWishlist, getWishlistCount: wishlistCount } = useWishlistStore();
  const { addItem: addToRecentlyViewed } = useRecentlyViewedStore();

  // Language options
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' }
  ];

  // Handle product selection from search
  const handleProductSelect = (product: ProductInCart) => {
    addToRecentlyViewed(product);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle product click
  const handleProductClick = (product: ProductInCart) => {
    addToRecentlyViewed(product);
  };

  // Language change handler
  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
  };

  // Add notification
  const addNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const demoAddToCart = (product: ProductInCart) => {
    addToCart(product);
    toast.success(`${product.productNameEnglish} added to cart!`);
    };

    const demoAddToWishlist = (product: ProductInCart) => {
        addToWishlist(product.id);
    toast.info(`${product.productNameEnglish} added to wishlist!`);
    };

    const demoAddToRecentlyViewed = (product: ProductInCart) => {
    addToRecentlyViewed(product);
    toast.info(`${product.productNameEnglish} added to recently viewed!`);
    };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300">
      <ToastProvider />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-sage-600">
                Nirvana Chai
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <SearchAutocomplete
                products={[]}
                onProductSelect={handleProductSelect}
                onSearch={handleSearch}
                placeholder="Search teas..."
                className="w-full"
              />
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="appearance-none bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Cart */}
              <button className="relative p-2 text-gray-600 hover:text-sage-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount()}
                  </span>
                )}
              </button>

              {/* Wishlist */}
              <button className="relative p-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="h-6 w-6" />
                {wishlistCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount()}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <button 
                onClick={() => addNotification('This is a demo notification!', 'info')}
                className="relative p-2 text-gray-600 hover:text-sage-600 transition-colors"
              >
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sage-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'demo', label: 'Demo Features', icon: Settings },
              { id: 'search', label: 'Search', icon: Search },
              { id: 'wishlist', label: 'Wishlist', icon: Heart },
              { id: 'recent', label: 'Recently Viewed', icon: User }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-sage-500 text-sage-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Demo Features Tab */}
          {activeTab === 'demo' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Integrated Features Demo
                </h2>
                <p className="text-gray-600 mb-6">
                  This demonstrates all the integrated libraries working together: Zustand for state management, 
                  Fuse.js for search, react-toastify for notifications, framer-motion for animations, 
                  Headless UI components, and i18n for internationalization.
                </p>

                {/* Demo Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => demoAddToCart(sampleProducts[0])}
                    className="flex items-center justify-center space-x-2 bg-sage-600 text-white px-4 py-2 rounded-lg hover:bg-sage-700 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => demoAddToWishlist(sampleProducts[1])}
                    className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Add to Wishlist</span>
                  </button>
                  
                  <button
                    onClick={() => demoAddToRecentlyViewed(sampleProducts[2])}
                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Add to Recent</span>
                  </button>
                </div>

                {/* Current State Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Cart Items</h3>
                    <p className="text-gray-600">{cartItemCount()} items</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Wishlist Items</h3>
                    <p className="text-gray-600">{wishlistCount()} items</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Dark Mode</h3>
                    <p className="text-gray-600">Disabled</p>
                  </div>
                </div>
              </div>

              {/* Sample Products */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sampleProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.productNameEnglish}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {product.productNameEnglish}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-sage-600">
                          ${product.price}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => demoAddToCart(product)}
                            className="p-2 bg-sage-100 text-sage-600 rounded-lg hover:bg-sage-200 transition-colors"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => demoAddToWishlist(product)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Search Tab */}
          {activeTab === 'search' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Search with Fuse.js Autocomplete
                </h2>
                <SearchAutocomplete
                  products={[]}
                  onProductSelect={handleProductSelect}
                  onSearch={handleSearch}
                  placeholder="Try searching for 'Darjeeling', 'Assam', or 'Green'..."
                  className="max-w-md"
                />
              </div>
            </motion.div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Wishlist
                products={[]}
                onProductClick={handleProductClick}
                showTitle={false}
              />
            </motion.div>
          )}

          {/* Recently Viewed Tab */}
          {activeTab === 'recent' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <RecentlyViewed
                onProductClick={handleProductClick}
                showTitle={false}
              />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default IntegratedFeatures;