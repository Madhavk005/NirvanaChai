import { useState } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart } from 'lucide-react';
import { useLanguageCurrency } from '../contexts/LanguageCurrencyContext';

export default function Shop() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('name');

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
      image: "☕",
      description: "A premium Ceylon black tea with bergamot and cornflower petals",
      badges: ["Premium", "Best Seller"]
    },
    {
      id: 2,
      name: "Dragon Well Green",
      category: "green",
      region: "china",
      price: 32.99,
      rating: 4.9,
      reviews: 89,
      image: "🐉",
      description: "Classic Chinese green tea with delicate, sweet flavor",
      badges: ["Organic"]
    },
    {
      id: 3,
      name: "Himalayan Gold",
      category: "black",
      region: "darjeeling",
      price: 45.99,
      rating: 4.7,
      reviews: 156,
      image: "🏔️",
      description: "Premium Darjeeling black tea with muscatel flavor",
      badges: ["Limited Edition", "Premium"]
    },
    {
      id: 4,
      name: "Morning Serenity",
      category: "herbal",
      region: "all",
      price: 22.99,
      rating: 4.6,
      reviews: 203,
      image: "🌅",
      description: "Calming chamomile blend perfect for morning meditation",
      badges: ["Caffeine Free"]
    },
    {
      id: 5,
      name: "Assam Breakfast",
      category: "black",
      region: "assam",
      price: 26.99,
      rating: 4.8,
      reviews: 172,
      image: "🌿",
      description: "Bold, malty Assam tea perfect for your morning routine",
      badges: ["Best Seller"]
    },
    {
      id: 6,
      name: "Silver Needle White",
      category: "white",
      region: "china",
      price: 68.99,
      rating: 4.9,
      reviews: 43,
      image: "🤍",
      description: "Rare Chinese white tea with subtle, delicate flavor",
      badges: ["Premium", "Rare"]
    },
    {
      id: 7,
      name: "Iron Goddess Oolong",
      category: "oolong",
      region: "china",
      price: 42.99,
      rating: 4.7,
      reviews: 98,
      image: "🍃",
      description: "Traditional Chinese oolong with complex floral notes",
      badges: ["Traditional"]
    },
    {
      id: 8,
      name: "Evening Bliss",
      category: "herbal",
      region: "all",
      price: 24.99,
      rating: 4.5,
      reviews: 134,
      image: "🌙",
      description: "Relaxing lavender and chamomile blend for peaceful evenings",
      badges: ["Caffeine Free"]
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
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-sage-800 mb-4">
          Premium Tea Collection
        </h1>
        <p className="text-lg text-sage-600">
          Discover our carefully curated selection of premium teas from the world's finest tea gardens.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-heading font-semibold text-sage-800 mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h3>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-sage-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-400" />
                <input
                  type="text"
                  placeholder="Search teas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium text-sage-700 mb-3">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-3 text-sage-600"
                      />
                      <span className="text-sm text-sage-700">{category.name}</span>
                    </div>
                    <span className="text-xs text-sage-500">({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Regions */}
            <div className="mb-6">
              <h4 className="font-medium text-sage-700 mb-3">Origin</h4>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
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
              <h4 className="font-medium text-sage-700 mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </h4>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-sage-600">
              Showing {sortedProducts.length} of {products.length} products
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-border rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-sage-100 text-sage-700' : 'text-sage-400'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-sage-100 text-sage-700' : 'text-sage-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'} bg-gradient-to-br from-sage-50 to-clay-50 flex items-center justify-center text-6xl`}>
                  {product.image}
                </div>
                
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.badges.map((badge, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          badge === 'Premium' ? 'bg-clay-100 text-clay-700' :
                          badge === 'Best Seller' ? 'bg-green-100 text-green-700' :
                          badge === 'Limited Edition' ? 'bg-purple-100 text-purple-700' :
                          badge === 'Organic' ? 'bg-emerald-100 text-emerald-700' :
                          badge === 'Caffeine Free' ? 'bg-blue-100 text-blue-700' :
                          'bg-sage-100 text-sage-700'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-sage-800 mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sage-600 mb-4 text-sm">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-sage-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price and Actions */}
                  <div className={`flex ${viewMode === 'list' ? 'flex-col' : 'justify-between'} items-start gap-4`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-semibold text-sage-800">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-sage-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <span className="text-sm text-green-600 font-medium">
                          Save ${(product.originalPrice - product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <button className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-2 rounded-full transition-colors flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🫖</div>
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-2">
                No teas found
              </h3>
              <p className="text-sage-600">
                Try adjusting your filters to find the perfect tea for you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
