import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Globe, Award, Heart, Recycle, Package, MapPin, Truck } from 'lucide-react';
import { useLanguageCurrency } from '../contexts/LanguageCurrencyContext';
import { OptimizedImage, teaImages } from '../components/OptimizedImage';
import { useEnhancedMotion, useHoverMotion, useStaggeredMotion } from '../hooks/useEnhancedMotion';
import { useTranslation } from 'react-i18next';

export default function Index() {
  const { t: tLegacy, formatPrice, detectedLocation, shippingInfo, isLocationDetected } = useLanguageCurrency();
  const { t } = useTranslation();

  // Enhanced motion hooks
  const heroMotion = useEnhancedMotion({ delay: 200, duration: 800 });
  const featuresMotion = useEnhancedMotion({ delay: 100, duration: 600 });
  const sourcingMotion = useEnhancedMotion({ delay: 100, duration: 600 });
  const productsMotion = useEnhancedMotion({ delay: 100, duration: 600 });
  const newsletterMotion = useEnhancedMotion({ delay: 100, duration: 600 });

  // Staggered animations for feature cards
  const featureStaggered = useStaggeredMotion(features, 200, 150);

  const features = [
    {
      key: "expertise",
      icon: <Award className="h-12 w-12 text-sage-600" />,
      title: "Three generations of mastery",
      description: "Traditional wisdom passed down through generations of tea artisans"
    },
    {
      key: "global",
      icon: <Globe className="h-12 w-12 text-sage-600" />,
      title: "Ethically sourced worldwide",
      description: "Premium teas from the world's most celebrated tea gardens"
    },
    {
      key: "curated",
      icon: <Leaf className="h-12 w-12 text-sage-600" />,
      title: "Mindfully crafted blends",
      description: "Each blend tells a story of flavor, aroma, and cultural heritage"
    },
    {
      key: "pure",
      icon: <Heart className="h-12 w-12 text-sage-600" />,
      title: "Pure, natural ingredients",
      description: "No artificial additives — just the pure essence of tea"
    },
    {
      key: "sustainable",
      icon: <Recycle className="h-12 w-12 text-sage-600" />,
      title: "Sustainably cultivated",
      description: "Supporting communities and preserving tea traditions"
    },
    {
      key: "fresh",
      icon: <Package className="h-12 w-12 text-sage-600" />,
      title: "Peak freshness guaranteed",
      description: "From garden to cup in days, not months"
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={teaImages.hero}
            alt="Premium tea collection hero background"
            className="w-full h-full"
            aspectRatio="wide"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sage-900/70 via-sage-800/50 to-transparent"></div>
        </div>

        <div
          ref={heroMotion.elementRef as React.RefObject<HTMLDivElement>}
          style={heroMotion.getMotionStyles('fadeInUp')}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              {/* Location-based greeting */}
              {isLocationDetected && detectedLocation && (
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 text-white/90 text-sm font-medium">
                  <MapPin className="h-4 w-4 mr-2" />
                  {t('shipping.your_location', 'Shipping to')} {detectedLocation}
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                {t('hero.title1', 'Discover Your')}
                <span className="block text-clay-300">{t('hero.title2', 'Perfect Cup')}</span>
              </h1>

              <p className="text-lg sm:text-xl text-sage-100 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('hero.subtitle', 'From ancient gardens to your cup — experience the art of mindful tea drinking that connects cultures, generations, and moments of pure tranquility.')}
              </p>

              {/* Enhanced CTAs with trust indicators */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    to="/shop"
                    className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {t('hero.cta_primary', 'Start Your Journey')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/shop"
                    className="border-2 border-white text-white hover:bg-white hover:text-sage-800 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 backdrop-blur-sm transform hover:scale-105"
                  >
                    {t('hero.cta_secondary', 'Explore Collection')}
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-white/80">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-1">✓</span>
                    {t('trust.money_back', '30-Day Money Back')}
                  </div>
                  {shippingInfo && (
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      {t('shipping.free_shipping_from', 'Free shipping from')} {formatPrice(shippingInfo.freeShippingThreshold)}
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="text-green-400 mr-1">✓</span>
                    {t('trust.trusted_by', 'Trusted by 10,000+ customers')}
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:order-last">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                <OptimizedImage
                  src={teaImages.teaCup}
                  alt="Premium tea cup"
                  className="w-full h-96 lg:h-[500px]"
                  aspectRatio="portrait"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-clay-300/30 rounded-2xl -z-10"></div>
              <div className="absolute top-4 right-4 w-full h-full bg-gradient-to-br from-sage-400/20 to-transparent rounded-2xl -z-20"></div>
            </div>
          </div>
        </div>

        {/* Floating Tea Leaves Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-sage-300/60 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
            🍃
          </div>
          <div className="absolute top-1/3 right-1/3 text-sage-300/40 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
            🍃
          </div>
          <div className="absolute bottom-1/4 right-1/4 text-sage-300/50 animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>
            🍃
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-sm mt-2 text-white/70">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Why Choose Nirvanachai Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={featuresMotion.elementRef as React.RefObject<HTMLDivElement>}
            style={featuresMotion.getMotionStyles('fadeInUp')}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-sage-800 mb-6">
              {t('why_choose.title', 'Why Tea Lovers Choose Nirvanachai')}
            </h2>
            <p className="text-lg sm:text-xl text-sage-600 max-w-4xl mx-auto leading-relaxed">
              {t('why_choose.subtitle', 'Discover the difference that three generations of passion, premium sourcing, and mindful curation make in every sip.')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const hoverMotion = useHoverMotion();

              return (
                <div
                  key={index}
                  ref={featureStaggered[index].elementRef as React.RefObject<HTMLDivElement>}
                  style={{
                    ...featureStaggered[index].getMotionStyles('fadeInUp'),
                    ...hoverMotion.getHoverStyles({ scale: 1.03, translateY: -8 })
                  }}
                  {...hoverMotion.hoverProps}
                  className="bg-card border border-border rounded-2xl p-6 lg:p-8 text-center group cursor-pointer"
                >
                  <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-semibold text-sage-800 mb-4 group-hover:text-sage-900 transition-colors">
                    {t(`why_choose.${feature.key}`, feature.title)}
                  </h3>
                  <p className="text-sage-600 leading-relaxed text-sm sm:text-base group-hover:text-sage-700 transition-colors">
                    {t(`why_choose.${feature.key}_desc`, feature.description)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Sourcing Section */}
      <section className="py-20 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sage-800 mb-4">
              {t('global_sourcing.title', 'Global Sourcing, Local Soul')}
            </h2>
            <p className="text-lg text-sage-600 max-w-3xl mx-auto">
              {t('global_sourcing.subtitle', 'Our tea journey spans the world\'s most renowned tea regions, each contributing its unique character to create the perfect cup that connects cultures and generations.')}
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
              {t('featured.title', 'Featured Blends')}
            </h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              {t('featured.subtitle', 'Discover our most beloved tea collections, carefully crafted to bring you moments of tranquility and joy.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Morning Serenity",
                description: "A gentle blend of Darjeeling and chamomile",
                price: 24.99,
                image: "🌅"
              },
              {
                name: "Evening Bliss",
                description: "Calming Ceylon tea with lavender notes",
                price: 26.99,
                image: "🌙"
              },
              {
                name: "Heritage Chai",
                description: "Traditional Assam blend with warming spices",
                price: 22.99,
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
                      {formatPrice(product.price)}
                    </span>
                    <button className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-2 rounded-full transition-colors">
                      {t('featured.add_to_cart', 'Add to Cart')}
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

      {/* Newsletter Signup - Enhanced with FOMO and value props */}
      <section className="py-20 bg-sage-800 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"}></div>
        </div>

        <div
          ref={newsletterMotion.elementRef as React.RefObject<HTMLDivElement>}
          style={newsletterMotion.getMotionStyles('fadeInUp')}
          className="relative max-w-5xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            {t('newsletter.title', 'Join 10,000+ Tea Enthusiasts')}
          </h2>
          <p className="text-xl text-sage-200 mb-8 max-w-3xl mx-auto">
            {t('newsletter.subtitle', 'Get exclusive access to new blends, brewing secrets, and special offers before anyone else.')}
          </p>

          {/* Value propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center text-sage-200">
              {t('newsletter.benefit1', '🎁 20% off your first order')}
            </div>
            <div className="flex items-center justify-center text-sage-200">
              {t('newsletter.benefit2', '🍃 Early access to new blends')}
            </div>
            <div className="flex items-center justify-center text-sage-200">
              {t('newsletter.benefit3', '📚 Free brewing guides')}
            </div>
          </div>

          {/* Enhanced signup form */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="email"
                placeholder={t('newsletter.email_placeholder', 'Enter your email address')}
                className="flex-1 px-6 py-4 rounded-full text-sage-800 focus:outline-none focus:ring-2 focus:ring-clay-400 transition-all duration-300"
              />
              <button className="bg-clay-500 hover:bg-clay-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                {t('newsletter.subscribe', 'Get Exclusive Access')}
              </button>
            </div>

            <p className="text-sm text-sage-300">
              {t('newsletter.no_spam', 'Premium content only. Unsubscribe anytime.')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
