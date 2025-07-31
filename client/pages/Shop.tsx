import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, Eye, ArrowUpDown, ChevronDown, X, SlidersHorizontal, Tag, MapPin, Clock, Zap } from 'lucide-react';
import { useLanguageCurrency } from '../contexts/LanguageCurrencyContext';
import { useSimpleAnimation, animationClasses } from '../hooks/useSimpleAnimation';

export default function Shop() {
  const { formatPrice, currentCurrency } = useLanguageCurrency();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const heroAnimation = useSimpleAnimation();
  const statsAnimation = useSimpleAnimation();
  const filtersAnimation = useSimpleAnimation();
  const productsAnimation = useSimpleAnimation();

  const categories = [
    { id: 'all', name: 'All Teas', count: 24, color: 'bg-sage-100 text-sage-700' },
    { id: 'black', name: 'Black Tea', count: 8, color: 'bg-amber-100 text-amber-700' },
    { id: 'green', name: 'Green Tea', count: 6, color: 'bg-emerald-100 text-emerald-700' },
    { id: 'oolong', name: 'Oolong Tea', count: 4, color: 'bg-orange-100 text-orange-700' },
    { id: 'white', name: 'White Tea', count: 3, color: 'bg-blue-100 text-blue-700' },
    { id: 'herbal', name: 'Herbal Blends', count: 3, color: 'bg-purple-100 text-purple-700' },
  ];

  const regions = [
    { id: 'all', name: 'All Regions', flag: '🌍' },
    { id: 'darjeeling', name: 'Darjeeling', flag: '🇮🇳' },
    { id: 'assam', name: 'Assam', flag: '🇮🇳' },
    { id: 'ceylon', name: 'Ceylon', flag: '🇱🇰' },
    { id: 'china', name: 'China', flag: '🇨🇳' },
    { id: 'kenya', name: 'Kenya', flag: '🇰🇪' },
    { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳' },
  ];

  const products = [
    {
      id: 1,
      name: "Earl Grey Supreme",
      category: "black",
      region: "ceylon",
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1594631661960-1bed6f2ce5a3?w=500&h=500&fit=crop&auto=format",
      description: "A premium Ceylon black tea with bergamot and cornflower petals for a refined, aromatic experience",
      badges: ["Premium", "Best Seller"],
      inStock: true,
      featured: true,
      brewTime: "3-5 min",
      caffeine: "High",
      tags: ["Citrusy", "Floral", "Morning"]
    },
    {
      id: 2,
      name: "Dragon Well Green",
      category: "green",
      region: "china",
      price: 32.99,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1571168131814-369d2c3cce52?w=500&h=500&fit=crop&auto=format",
      description: "Classic Chinese green tea with delicate, sweet flavor and beautiful flat leaves",
      badges: ["Organic"],
      inStock: true,
      featured: false,
      brewTime: "2-3 min",
      caffeine: "Medium",
      tags: ["Fresh", "Sweet", "Afternoon"]
    },
    {
      id: 3,
      name: "Himalayan Gold",
      category: "black",
      region: "darjeeling",
      price: 45.99,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&auto=format",
      description: "Premium Darjeeling black tea with distinctive muscatel flavor from high-altitude gardens",
      badges: ["Limited Edition", "Premium"],
      inStock: true,
      featured: true,
      brewTime: "4-6 min",
      caffeine: "High",
      tags: ["Muscatel", "Bold", "Morning"]
    },
    {
      id: 4,
      name: "Morning Serenity",
      category: "herbal",
      region: "all",
      price: 22.99,
      rating: 4.6,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1597318416776-193b90f03d72?w=500&h=500&fit=crop&auto=format",
      description: "Calming chamomile blend perfect for morning meditation and peaceful moments",
      badges: ["Caffeine Free"],
      inStock: true,
      featured: false,
      brewTime: "5-7 min",
      caffeine: "None",
      tags: ["Calming", "Floral", "Evening"]
    },
    {
      id: 5,
      name: "Assam Breakfast",
      category: "black",
      region: "assam",
      price: 26.99,
      rating: 4.8,
      reviews: 172,
      image: "https://images.unsplash.com/photo-1556909114-4b8f2b82d8fc?w=500&h=500&fit=crop&auto=format",
      description: "Bold, malty Assam tea perfect for your morning routine with rich, full-bodied flavor",
      badges: ["Best Seller"],
      inStock: true,
      featured: false,
      brewTime: "3-5 min",
      caffeine: "High",
      tags: ["Malty", "Strong", "Morning"]
    },
    {
      id: 6,
      name: "Silver Needle White",
      category: "white",
      region: "china",
      price: 68.99,
      rating: 4.9,
      reviews: 43,
      image: "https://images.unsplash.com/photo-1571168131813-884f7c96c03b?w=500&h=500&fit=crop&auto=format",
      description: "Rare Chinese white tea with subtle, delicate flavor and silvery buds",
      badges: ["Premium", "Rare"],
      inStock: false,
      featured: true,
      brewTime: "4-6 min",
      caffeine: "Low",
      tags: ["Delicate", "Rare", "Afternoon"]
    },
    {
      id: 7,
      name: "Iron Goddess Oolong",
      category: "oolong",
      region: "china",
      price: 42.99,
      rating: 4.7,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1559056961-84218992b9ce?w=500&h=500&fit=crop&auto=format",
      description: "Traditional Chinese oolong with complex floral notes and smooth finish",
      badges: ["Traditional"],
      inStock: true,
      featured: false,
      brewTime: "3-4 min",
      caffeine: "Medium",
      tags: ["Floral", "Complex", "Traditional"]
    },
    {
      id: 8,
      name: "Evening Bliss",
      category: "herbal",
      region: "all",
      price: 24.99,
      rating: 4.5,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=500&fit=crop&auto=format",
      description: "Relaxing lavender and chamomile blend for peaceful evenings and better sleep",
      badges: ["Caffeine Free"],
      inStock: true,
      featured: false,
      brewTime: "5-7 min",
      caffeine: "None",
      tags: ["Relaxing", "Lavender", "Evening"]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || product.region === selectedRegion;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesRegion && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedRegion('all');
    setPriceRange([0, 100]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedRegion !== 'all' || priceRange[0] > 0 || priceRange[1] < 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50/50 via-off-white to-sage-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sage-600 via-sage-700 to-chai-800 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571168131814-369d2c3cce52?w=1200&h=600&fit=crop&auto=format"
            alt="Tea plantation"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sage-900/80 via-sage-800/60 to-chai-900/80"></div>
        </div>
        
        <div 
          ref={heroAnimation.elementRef}
          className={`relative z-10 max-w-7xl mx-auto px-4 text-center ${animationClasses.fadeInUp(heroAnimation.isVisible)}`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Premium Tea
            <span className="block text-clay-300">Collection</span>
          </h1>
          <p className="text-xl md:text-2xl text-sage-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover handpicked teas from the world's finest gardens. Each blend tells a story of tradition, terroir, and timeless craftsmanship.
          </p>
          
          {/* Quick Stats */}
          <div 
            ref={statsAnimation.elementRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto ${animationClasses.fadeInUp(statsAnimation.isVisible)}`}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-clay-300 mb-2">24</div>
              <div className="text-sage-200 text-sm">Premium Blends</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-clay-300 mb-2">7</div>
              <div className="text-sage-200 text-sm">Tea Origins</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-clay-300 mb-2">4.9</div>
              <div className="text-sage-200 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-clay-300 mb-2">100%</div>
              <div className="text-sage-200 text-sm">Ethically Sourced</div>
            </div>
          </div>
        </div>

        {/* Floating tea leaves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 text-sage-300/30 text-4xl animate-float" style={{ animationDelay: '0s' }}>🍃</div>
          <div className="absolute top-1/3 right-1/4 text-sage-300/20 text-3xl animate-float" style={{ animationDelay: '2s' }}>🍃</div>
          <div className="absolute bottom-1/4 left-1/3 text-sage-300/25 text-4xl animate-float" style={{ animationDelay: '4s' }}>🍃</div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Advanced Filters Sidebar */}
          <div 
            ref={filtersAnimation.elementRef}
            className={`xl:w-80 ${animationClasses.fadeInUp(filtersAnimation.isVisible)}`}
          >
            {/* Mobile Filter Toggle */}
            <div className="xl:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full bg-white border border-sage-200 rounded-2xl p-4 flex items-center justify-between text-sage-700 hover:bg-sage-50 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="font-semibold">Filter & Sort</span>
                  {hasActiveFilters && (
                    <span className="bg-sage-500 text-white text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden xl:block'}`}>
              {/* Enhanced Search */}
              <div className="bg-white/90 backdrop-blur-sm border border-sage-200 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-heading font-bold text-sage-800 mb-4 flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search Teas
                </h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
                  <input
                    type="text"
                    placeholder="Search by name, flavor, or mood..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent bg-sage-50/50 transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-400 hover:text-sage-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-white/90 backdrop-blur-sm border border-sage-200 rounded-3xl p-6 shadow-lg">
                <h4 className="font-heading font-bold text-sage-800 mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Tea Categories
                </h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-3 text-sage-600 focus:ring-sage-400"
                        />
                        <span className="text-sage-700 group-hover:text-sage-800 transition-colors font-medium">
                          {category.name}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${category.color}`}>
                        {category.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Origin Filter */}
              <div className="bg-white/90 backdrop-blur-sm border border-sage-200 rounded-3xl p-6 shadow-lg">
                <h4 className="font-heading font-bold text-sage-800 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Tea Origins
                </h4>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full p-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 bg-sage-50/50 transition-all"
                >
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.flag} {region.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="bg-white/90 backdrop-blur-sm border border-sage-200 rounded-3xl p-6 shadow-lg">
                <h4 className="font-heading font-bold text-sage-800 mb-4">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </h4>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-sage-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-sage-500 mt-2 font-medium">
                    <span>$0</span>
                    <span>$100+</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full bg-sage-100 hover:bg-sage-200 text-sage-700 py-3 rounded-xl transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Enhanced Toolbar */}
            <div 
              ref={productsAnimation.elementRef}
              className={`flex flex-col lg:flex-row justify-between items-center mb-8 gap-4 ${animationClasses.fadeInUp(productsAnimation.isVisible)}`}
            >
              <div className="text-sage-600 font-semibold text-lg">
                {sortedProducts.length > 0 ? (
                  <>Showing <span className="text-sage-800">{sortedProducts.length}</span> of <span className="text-sage-800">{products.length}</span> premium teas</>
                ) : (
                  'No teas found'
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-sage-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-sage-400 cursor-pointer font-medium shadow-sm"
                  >
                    <option value="featured">🌟 Featured First</option>
                    <option value="name">📝 Name A-Z</option>
                    <option value="price-low">💰 Price: Low to High</option>
                    <option value="price-high">💎 Price: High to Low</option>
                    <option value="rating">⭐ Highest Rated</option>
                    <option value="reviews">💬 Most Reviews</option>
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-400 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="flex bg-sage-100 border border-sage-200 rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-white text-sage-700 shadow-sm' 
                        : 'text-sage-500 hover:text-sage-700'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all ${
                      viewMode === 'list' 
                        ? 'bg-white text-sage-700 shadow-sm' 
                        : 'text-sage-500 hover:text-sage-700'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1 max-w-5xl'}`}>
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`group bg-white/95 backdrop-blur-sm border border-sage-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-sage-200/50 transition-all duration-700 hover:-translate-y-3 ${
                      viewMode === 'list' ? 'flex' : 'flex flex-col'
                    } ${!product.inStock ? 'opacity-80' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Product Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-80 flex-shrink-0' : 'aspect-square'} overflow-hidden`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1563822249366-64d5054b76ca?w=500&h=500&fit=crop&auto=format";
                        }}
                      />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg transform hover:scale-110">
                          <Eye className="h-5 w-5 text-sage-700" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`backdrop-blur-sm p-3 rounded-full transition-all shadow-lg transform hover:scale-110 ${
                            wishlist.includes(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/90 hover:bg-white text-sage-700'
                          }`}
                        >
                          <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.badges.map((badge, badgeIndex) => (
                          <span
                            key={badgeIndex}
                            className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm shadow-lg ${
                              badge === 'Premium' ? 'bg-gradient-to-r from-clay-500 to-clay-600 text-white' :
                              badge === 'Best Seller' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                              badge === 'Limited Edition' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' :
                              badge === 'Organic' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' :
                              badge === 'Caffeine Free' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                              badge === 'Rare' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' :
                              'bg-gradient-to-r from-sage-500 to-sage-600 text-white'
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                          <span className="bg-white px-6 py-3 rounded-full text-sage-800 font-bold shadow-lg">
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {/* Featured indicator */}
                      {product.featured && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-gradient-to-r from-clay-500 to-amber-500 text-white p-2 rounded-full shadow-lg">
                            <Star className="h-4 w-4 fill-current" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className={`p-6 lg:p-8 ${viewMode === 'list' ? 'flex-1 flex flex-col' : 'flex flex-col h-full'}`}>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl lg:text-2xl font-heading font-bold text-sage-800 group-hover:text-sage-700 transition-colors leading-tight">
                            {product.name}
                          </h3>
                          {product.inStock && (
                            <div className="flex items-center gap-1 text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs font-semibold">In Stock</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sage-600 mb-4 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Product Details */}
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex items-center gap-1 text-xs bg-sage-100 px-3 py-1 rounded-full">
                            <Clock className="h-3 w-3" />
                            <span className="font-medium">{product.brewTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs bg-clay-100 px-3 py-1 rounded-full">
                            <Zap className="h-3 w-3" />
                            <span className="font-medium">{product.caffeine}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-sage-50 text-sage-600 px-2 py-1 rounded-lg border border-sage-200 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-sage-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-sage-600 font-semibold">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className={`mt-auto ${viewMode === 'list' ? 'flex items-end justify-between gap-6' : 'space-y-5'}`}>
                        <div className={`${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
                          {/* Price Display */}
                          <div className="space-y-2">
                            <div className="flex items-baseline gap-3">
                              <div className="price-display">
                                <span className="text-2xl lg:text-3xl font-bold text-sage-800 tabular-nums">
                                  {formatPrice(product.price)}
                                </span>
                              </div>
                              {product.originalPrice && (
                                <div className="original-price">
                                  <span className="text-lg text-sage-400 line-through tabular-nums">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Savings Display */}
                            {product.originalPrice && (
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-green-700 font-bold bg-green-100 px-3 py-1.5 rounded-lg border border-green-200">
                                  Save {formatPrice(product.originalPrice - product.price)}
                                </span>
                                <span className="text-xs text-green-700 font-semibold bg-green-50 px-2 py-1 rounded-md">
                                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </span>
                              </div>
                            )}

                            {/* Currency Info */}
                            <div className="flex items-center gap-2 text-xs text-sage-500">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-sage-400 rounded-full"></span>
                                Prices in {currentCurrency.name}
                              </span>
                              {product.originalPrice && (
                                <span className="text-green-600 font-medium">
                                  Limited time offer
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className={`${viewMode === 'list' ? 'ml-6' : ''}`}>
                          {product.inStock ? (
                            <button className="group relative overflow-hidden bg-gradient-to-r from-sage-600 via-sage-700 to-chai-700 hover:from-sage-700 hover:via-sage-800 hover:to-chai-800 text-white px-8 py-4 rounded-2xl transition-all duration-500 flex items-center gap-3 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                              <ShoppingCart className="h-5 w-5 relative z-10" />
                              <span className="relative z-10">Add to Cart</span>
                            </button>
                          ) : (
                            <button disabled className="relative bg-gradient-to-r from-sage-200 to-sage-300 text-sage-600 px-8 py-4 rounded-2xl cursor-not-allowed flex items-center gap-3 font-bold shadow-sm border border-sage-300">
                              <div className="h-5 w-5 relative">
                                <div className="absolute inset-0 bg-sage-400 rounded-full opacity-30"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-sage-600 rotate-45"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 bg-sage-600 -rotate-45"></div>
                              </div>
                              <span>Sold Out</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-8xl mb-8 opacity-50">🫖</div>
                <h3 className="text-3xl font-heading font-bold text-sage-800 mb-4">
                  No teas found
                </h3>
                <p className="text-sage-600 mb-8 max-w-md mx-auto text-lg">
                  We couldn't find any teas matching your criteria. Try adjusting your filters to discover new flavors and experiences.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-sage-600 to-chai-600 hover:from-sage-700 hover:to-chai-700 text-white px-8 py-4 rounded-2xl transition-all font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.3; 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.1; 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B7355, #9CA68C);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          border: 2px solid white;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8B7355, #9CA68C);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
