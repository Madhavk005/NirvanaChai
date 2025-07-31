import { useState } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, Eye, ArrowUpDown, ChevronDown, X } from 'lucide-react';
import { useLanguageCurrency } from '../contexts/LanguageCurrencyContext';
import { useSimpleAnimation, animationClasses } from '../hooks/useSimpleAnimation';

export default function Shop() {
  const { formatPrice } = useLanguageCurrency();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  const headerAnimation = useSimpleAnimation();
  const filtersAnimation = useSimpleAnimation();
  const productsAnimation = useSimpleAnimation();

  const categories = [
    { id: 'all', name: 'All Teas', count: 24 },
    { id: 'black', name: 'Black Tea', count: 8 },
    { id: 'green', name: 'Green Tea', count: 6 },
    { id: 'oolong', name: 'Oolong Tea', count: 4 },
    { id: 'white', name: 'White Tea', count: 3 },
    { id: 'herbal', name: 'Herbal Blends', count: 3 },
  ];

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'darjeeling', name: 'Darjeeling' },
    { id: 'assam', name: 'Assam' },
    { id: 'ceylon', name: 'Ceylon' },
    { id: 'china', name: 'China' },
    { id: 'kenya', name: 'Kenya' },
    { id: 'vietnam', name: 'Vietnam' },
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
      image: "https://images.unsplash.com/photo-1594631661960-1bed6f2ce5a3?w=400&h=400&fit=crop&auto=format",
      description: "A premium Ceylon black tea with bergamot and cornflower petals",
      badges: ["Premium", "Best Seller"],
      inStock: true,
      featured: true
    },
    {
      id: 2,
      name: "Dragon Well Green",
      category: "green",
      region: "china",
      price: 32.99,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1571168131814-369d2c3cce52?w=400&h=400&fit=crop&auto=format",
      description: "Classic Chinese green tea with delicate, sweet flavor",
      badges: ["Organic"],
      inStock: true,
      featured: false
    },
    {
      id: 3,
      name: "Himalayan Gold",
      category: "black",
      region: "darjeeling",
      price: 45.99,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format",
      description: "Premium Darjeeling black tea with muscatel flavor",
      badges: ["Limited Edition", "Premium"],
      inStock: true,
      featured: true
    },
    {
      id: 4,
      name: "Morning Serenity",
      category: "herbal",
      region: "all",
      price: 22.99,
      rating: 4.6,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1597318416776-193b90f03d72?w=400&h=400&fit=crop&auto=format",
      description: "Calming chamomile blend perfect for morning meditation",
      badges: ["Caffeine Free"],
      inStock: true,
      featured: false
    },
    {
      id: 5,
      name: "Assam Breakfast",
      category: "black",
      region: "assam",
      price: 26.99,
      rating: 4.8,
      reviews: 172,
      image: "https://images.unsplash.com/photo-1556909114-4b8f2b82d8fc?w=400&h=400&fit=crop&auto=format",
      description: "Bold, malty Assam tea perfect for your morning routine",
      badges: ["Best Seller"],
      inStock: true,
      featured: false
    },
    {
      id: 6,
      name: "Silver Needle White",
      category: "white",
      region: "china",
      price: 68.99,
      rating: 4.9,
      reviews: 43,
      image: "https://images.unsplash.com/photo-1571168131813-884f7c96c03b?w=400&h=400&fit=crop&auto=format",
      description: "Rare Chinese white tea with subtle, delicate flavor",
      badges: ["Premium", "Rare"],
      inStock: false,
      featured: true
    },
    {
      id: 7,
      name: "Iron Goddess Oolong",
      category: "oolong",
      region: "china",
      price: 42.99,
      rating: 4.7,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1559056961-84218992b9ce?w=400&h=400&fit=crop&auto=format",
      description: "Traditional Chinese oolong with complex floral notes",
      badges: ["Traditional"],
      inStock: true,
      featured: false
    },
    {
      id: 8,
      name: "Evening Bliss",
      category: "herbal",
      region: "all",
      price: 24.99,
      rating: 4.5,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop&auto=format",
      description: "Relaxing lavender and chamomile blend for peaceful evenings",
      badges: ["Caffeine Free"],
      inStock: true,
      featured: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
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
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedRegion('all');
    setPriceRange([0, 100]);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedRegion !== 'all' || priceRange[0] > 0 || priceRange[1] < 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50/30 to-off-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div 
          ref={headerAnimation.elementRef}
          className={`mb-12 text-center ${animationClasses.fadeInUp(headerAnimation.isVisible)}`}
        >
          <h1 className="text-5xl lg:text-6xl font-heading font-bold text-sage-800 mb-6 tracking-tight">
            Premium Tea Collection
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated selection of premium teas from the world's finest tea gardens. 
            Each blend tells a story of tradition, craftsmanship, and mindful cultivation.
          </p>
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-sage-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Ethically Sourced</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-clay-500 rounded-full"></div>
              <span>Direct Trade</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
              <span>Small Batch</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="xl:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-white border border-sage-200 rounded-2xl p-4 flex items-center justify-between text-sage-700 hover:bg-sage-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <span className="font-medium">Filters</span>
                {hasActiveFilters && (
                  <span className="bg-sage-500 text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters Sidebar */}
          <div 
            ref={filtersAnimation.elementRef}
            className={`xl:w-80 space-y-6 ${animationClasses.fadeInUp(filtersAnimation.isVisible)} ${
              showFilters ? 'block' : 'hidden xl:block'
            }`}
          >
            <div className="bg-white/80 backdrop-blur-sm border border-sage-200 rounded-3xl p-8 shadow-lg shadow-sage-100/50 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-semibold text-sage-800 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-sage-500 hover:text-sage-700 flex items-center gap-1 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-sage-700 mb-3">Search Teas</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-400" />
                  <input
                    type="text"
                    placeholder="Earl Grey, Oolong..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent bg-sage-50/50 transition-all"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-sage-700 mb-4">Tea Categories</h4>
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
                        <span className="text-sage-700 group-hover:text-sage-800 transition-colors">{category.name}</span>
                      </div>
                      <span className="text-xs text-sage-500 bg-sage-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Regions */}
              <div className="mb-8">
                <h4 className="font-semibold text-sage-700 mb-4">Tea Origin</h4>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full p-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 bg-sage-50/50 transition-all"
                >
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-sage-700 mb-4">
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
                  <div className="flex justify-between text-xs text-sage-500 mt-2">
                    <span>$0</span>
                    <span>$100+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div 
              ref={productsAnimation.elementRef}
              className={`flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 ${animationClasses.fadeInUp(productsAnimation.isVisible)}`}
            >
              <div className="text-sage-600 font-medium">
                Showing {sortedProducts.length} of {products.length} premium teas
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-sage-200 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-sage-400 cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-400 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="flex bg-sage-100 border border-sage-200 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-white text-sage-700 shadow-sm' 
                        : 'text-sage-500 hover:text-sage-700'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
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

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`group bg-white/90 backdrop-blur-sm border border-sage-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-sage-200/50 transition-all duration-500 hover:-translate-y-2 ${
                      viewMode === 'list' ? 'flex' : 'flex flex-col'
                    } ${!product.inStock ? 'opacity-75' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-square'} overflow-hidden`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1563822249366-64d5054b76ca?w=400&h=400&fit=crop&auto=format";
                        }}
                      />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg">
                          <Eye className="h-5 w-5 text-sage-700" />
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg">
                          <Heart className="h-5 w-5 text-sage-700" />
                        </button>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1">
                        {product.badges.map((badge, badgeIndex) => (
                          <span
                            key={badgeIndex}
                            className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                              badge === 'Premium' ? 'bg-clay-500/90 text-white' :
                              badge === 'Best Seller' ? 'bg-green-500/90 text-white' :
                              badge === 'Limited Edition' ? 'bg-purple-500/90 text-white' :
                              badge === 'Organic' ? 'bg-emerald-500/90 text-white' :
                              badge === 'Caffeine Free' ? 'bg-blue-500/90 text-white' :
                              badge === 'Rare' ? 'bg-amber-500/90 text-white' :
                              'bg-sage-500/90 text-white'
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-white px-4 py-2 rounded-full text-sage-800 font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className={`p-8 ${viewMode === 'list' ? 'flex-1 flex flex-col' : 'flex flex-col h-full'}`}>
                      <div className="flex-grow">
                        <h3 className="text-xl font-heading font-bold text-sage-800 mb-3 group-hover:text-sage-700 transition-colors leading-tight">
                          {product.name}
                        </h3>

                        <p className="text-sage-600 mb-4 leading-relaxed text-sm">
                          {product.description}
                        </p>

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
                          <span className="text-sm text-sage-600 font-medium">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>

                        {/* Stock indicator for in-stock items */}
                        {product.inStock && (
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 font-medium">In Stock</span>
                          </div>
                        )}
                      </div>

                      {/* Price and Actions */}
                      <div className={`mt-auto ${viewMode === 'list' ? 'flex items-end justify-between' : 'space-y-4'}`}>
                        <div className={`${viewMode === 'list' ? 'flex-grow' : ''}`}>
                          <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-2xl font-bold text-sage-800">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-lg text-sage-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          {product.originalPrice && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-lg">
                                Save {formatPrice(product.originalPrice - product.price)}
                              </span>
                              <span className="text-xs text-green-600">
                                ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                              </span>
                            </div>
                          )}
                        </div>

                        <div className={`${viewMode === 'list' ? 'ml-6' : ''}`}>
                          {product.inStock ? (
                            <button className="group relative overflow-hidden bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-sage-600/20">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                              <ShoppingCart className="h-5 w-5 relative z-10" />
                              <span className="relative z-10">Add to Cart</span>
                            </button>
                          ) : (
                            <button disabled className="relative bg-gradient-to-r from-sage-200 to-sage-300 text-sage-600 px-8 py-3.5 rounded-xl cursor-not-allowed flex items-center gap-3 font-semibold shadow-sm border border-sage-300">
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
              <div className="text-center py-16">
                <div className="text-8xl mb-6 opacity-50">🫖</div>
                <h3 className="text-2xl font-heading font-bold text-sage-800 mb-4">
                  No teas found
                </h3>
                <p className="text-sage-600 mb-8 max-w-md mx-auto">
                  We couldn't find any teas matching your criteria. Try adjusting your filters to discover new flavors.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-2xl transition-colors font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8B7355;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8B7355;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
