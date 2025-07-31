import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Globe, Award, Heart, Recycle, Package } from 'lucide-react';

export default function Index() {
  const features = [
    {
      icon: <Award className="h-12 w-12 text-sage-600" />,
      title: "Three generations of expertise",
      description: "Crafted with knowledge passed down through generations of tea masters"
    },
    {
      icon: <Globe className="h-12 w-12 text-sage-600" />,
      title: "Sourced globally",
      description: "From India, Sri Lanka, Kenya, China, and Vietnam - the world's finest tea regions"
    },
    {
      icon: <Leaf className="h-12 w-12 text-sage-600" />,
      title: "Curated blends & single-origin",
      description: "Carefully selected premium teas and expertly crafted signature blends"
    },
    {
      icon: <Heart className="h-12 w-12 text-sage-600" />,
      title: "Pure ingredients",
      description: "No artificial additives - just pure, natural tea leaves and botanicals"
    },
    {
      icon: <Recycle className="h-12 w-12 text-sage-600" />,
      title: "Sustainably sourced",
      description: "Ethically crafted with respect for our planet and tea communities"
    },
    {
      icon: <Package className="h-12 w-12 text-sage-600" />,
      title: "Freshly packed",
      description: "Maximum aroma & flavor preserved in every package we send"
    }
  ];

  const regions = [
    {
      name: "Darjeeling",
      country: "India",
      description: "Elegant, floral teas from the Himalayan foothills",
      image: "🏔️",
      color: "from-blue-50 to-blue-100"
    },
    {
      name: "Assam",
      country: "India", 
      description: "Bold, malty black teas with deep character",
      image: "🌿",
      color: "from-green-50 to-green-100"
    },
    {
      name: "Kenya",
      country: "Kenya",
      description: "Bright, brisk flavors ideal for rich blends",
      image: "🦒",
      color: "from-orange-50 to-orange-100"
    },
    {
      name: "Ceylon",
      country: "Sri Lanka",
      description: "Crisp, citrusy profiles from high-grown estates",
      image: "🌴",
      color: "from-teal-50 to-teal-100"
    },
    {
      name: "Fujian",
      country: "China",
      description: "Ancient tea traditions and refined green, white, and oolong varieties",
      image: "🏮",
      color: "from-red-50 to-red-100"
    },
    {
      name: "Vietnamese Highlands",
      country: "Vietnam",
      description: "Smooth, delicate teas with unique regional character",
      image: "🎋",
      color: "from-purple-50 to-purple-100"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 via-off-white to-clay-50">
        <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239CA68C\" fill-opacity=\"0.05\" fill-rule=\"nonzero\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-sage-800 mb-6 leading-tight">
            Experience
            <span className="block text-chai-600">Nirvanachai</span>
          </h1>
          
          <p className="text-lg md:text-xl text-sage-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            More than a drink — tea is a daily ritual, a quiet companion, and a global connector. 
            Join us on a journey that spans continents and generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop"
              className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center group"
            >
              Explore Blends
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/shop"
              className="border-2 border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Floating Tea Leaves Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-sage-300 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
            🍃
          </div>
          <div className="absolute top-1/3 right-1/3 text-sage-300 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
            🍃
          </div>
          <div className="absolute bottom-1/4 right-1/4 text-sage-300 animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>
            🍃
          </div>
        </div>
      </section>

      {/* Why Choose Nirvanachai Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sage-800 mb-4">
              Why Choose Nirvanachai?
            </h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Discover what makes our tea journey extraordinary and why tea lovers worldwide trust our heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-sage-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-sage-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Sourcing Section */}
      <section className="py-20 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sage-800 mb-4">
              Global Sourcing, Local Soul
            </h2>
            <p className="text-lg text-sage-600 max-w-3xl mx-auto">
              Our tea journey spans the world's most renowned tea regions, each contributing its unique character 
              to create the perfect cup that connects cultures and generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${region.color} border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="text-4xl mb-4">{region.image}</div>
                <h3 className="text-xl font-heading font-semibold text-sage-800 mb-2">
                  {region.name}
                </h3>
                <div className="text-sm font-medium text-sage-600 mb-3">
                  {region.country}
                </div>
                <p className="text-sage-700 leading-relaxed">
                  {region.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/about"
              className="inline-flex items-center bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 group"
            >
              Learn Our Story
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sage-800 mb-4">
              Featured Blends
            </h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Discover our most beloved tea collections, carefully crafted to bring you moments of tranquility and joy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Morning Serenity",
                description: "A gentle blend of Darjeeling and chamomile",
                price: "$24.99",
                image: "🌅"
              },
              {
                name: "Evening Bliss", 
                description: "Calming Ceylon tea with lavender notes",
                price: "$26.99",
                image: "🌙"
              },
              {
                name: "Heritage Chai",
                description: "Traditional Assam blend with warming spices",
                price: "$22.99",
                image: "☕"
              }
            ].map((product, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-sage-50 to-clay-50 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-sage-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sage-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-semibold text-sage-800">
                      {product.price}
                    </span>
                    <button className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-2 rounded-full transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/shop"
              className="inline-flex items-center border-2 border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 group"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-sage-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Join Our Tea Journey
          </h2>
          <p className="text-xl text-sage-200 mb-8">
            Subscribe to receive tea wisdom, exclusive blends, and stories from our global tea family.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-sage-800 focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
            <button className="bg-clay-500 hover:bg-clay-600 text-white px-8 py-4 rounded-full font-medium transition-colors">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-sage-300 mt-4">
            No spam, just tea love. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
