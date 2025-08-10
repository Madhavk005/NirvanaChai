import { Leaf, Globe, Award, Heart, Recycle, Package } from "lucide-react";
import { OptimizedImage, teaImages } from "../components/OptimizedImage";
import {
  useScrollReveal,
  fadeInUp,
  fadeInUpVisible,
  fadeInUpHidden,
  fadeInLeft,
  fadeInLeftVisible,
  fadeInLeftHidden,
  fadeInRight,
  fadeInRightVisible,
  fadeInRightHidden,
} from "../hooks/useScrollReveal";

export default function About() {
  const features = [
    {
      icon: <Award className="h-12 w-12 text-sage-600" />,
      title: "Three generations of expertise",
      description:
        "Crafted with knowledge passed down through generations of tea masters",
    },
    {
      icon: <Globe className="h-12 w-12 text-sage-600" />,
      title: "Sourced from India, Sri Lanka, Kenya, China, and Vietnam",
      description:
        "Handpicked from the world's most celebrated tea-growing regions",
    },
    {
      icon: <Leaf className="h-12 w-12 text-sage-600" />,
      title: "Curated blends & single-origin offerings",
      description:
        "Carefully selected premium teas and expertly crafted signature blends",
    },
    {
      icon: <Heart className="h-12 w-12 text-sage-600" />,
      title: "Pure ingredients, no artificial additives",
      description: "Just pure, natural tea leaves and botanicals in every cup",
    },
    {
      icon: <Recycle className="h-12 w-12 text-sage-600" />,
      title: "Sustainably sourced, ethically crafted",
      description:
        "Respecting our planet and supporting tea-growing communities",
    },
    {
      icon: <Package className="h-12 w-12 text-sage-600" />,
      title: "Freshly packed for maximum aroma & flavor",
      description: "Premium quality preserved in every package we send",
    },
  ];

  const regions = [
    {
      name: "Darjeeling",
      location: "Himalayan foothills, India",
      description: "Elegant, floral teas from the Himalayan foothills",
      image: "🏔️",
      characteristics:
        "Known for its delicate muscatel flavor and golden liquor, Darjeeling teas are often called the 'Champagne of Teas'.",
    },
    {
      name: "Assam",
      location: "Northeast India",
      description: "Bold, malty black teas with deep character",
      image: "🌿",
      characteristics:
        "Rich, full-bodied teas perfect for breakfast blends, with a distinctive malty sweetness and robust flavor.",
    },
    {
      name: "Kenya",
      location: "East Africa",
      description: "Bright, brisk flavors ideal for rich blends",
      image: "🦒",
      characteristics:
        "High-grown teas with exceptional brightness and strength, perfect for adding body to breakfast blends.",
    },
    {
      name: "Ceylon",
      location: "Sri Lanka",
      description: "Crisp, citrusy profiles from high-grown estates",
      image: "🌴",
      characteristics:
        "Clean, bright teas with citrusy notes and excellent clarity, grown in high-altitude gardens.",
    },
    {
      name: "China",
      location: "Various provinces",
      description:
        "Ancient tea traditions and refined green, white, and oolong varieties",
      image: "🏮",
      characteristics:
        "The birthplace of tea, offering diverse flavors from delicate whites to complex oolongs and earthy pu-erhs.",
    },
    {
      name: "Vietnam",
      location: "Southeast Asia",
      description: "Smooth, delicate teas with unique regional character",
      image: "🎋",
      characteristics:
        "Artisanal teas with unique processing methods, offering smooth, clean flavors with distinctive regional notes.",
    },
  ];

  const heroRef = useScrollReveal();
  const featuresRef = useScrollReveal();
  const regionsRef = useScrollReveal();
  const heritageRef = useScrollReveal();
  const valuesRef = useScrollReveal();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={teaImages.meditation}
            alt="Tea meditation background"
            className="w-full h-full"
            aspectRatio="wide"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sage-900/80 via-sage-800/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div
          ref={heroRef.elementRef as React.RefObject<HTMLDivElement>}
          className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${fadeInUp} ${
            heroRef.isVisible ? fadeInUpVisible : fadeInUpHidden
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-6 leading-tight">
                Experience
                <span className="block text-clay-300">Nirvanachai</span>
              </h1>

              <div className="text-lg sm:text-xl leading-relaxed space-y-4 max-w-2xl">
                <p className="text-sage-100">
                  More than a drink — tea is a daily ritual, a quiet companion,
                  and a global connector.
                </p>
                <p className="text-sage-200">
                  Join us on a journey that spans continents and generations.
                </p>
                <p className="text-clay-200 font-medium text-xl sm:text-2xl mt-6">
                  Savor the story, sip the soul — with Nirvanachai.
                </p>
              </div>
            </div>

            {/* Feature Image */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                <OptimizedImage
                  src={teaImages.teaCeremony}
                  alt="Traditional tea ceremony"
                  className="w-full h-96 lg:h-[500px]"
                  aspectRatio="portrait"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-clay-300/30 rounded-2xl -z-10"></div>
              <div className="absolute top-4 left-4 w-full h-full bg-gradient-to-br from-sage-400/20 to-transparent rounded-2xl -z-20"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-sm mt-2 text-white/70">
              Scroll to explore
            </span>
          </div>
        </div>
      </section>

      {/* Why Choose Nirvanachai Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={featuresRef.elementRef as React.RefObject<HTMLDivElement>}
            className={`text-center mb-16 ${fadeInUp} ${
              featuresRef.isVisible ? fadeInUpVisible : fadeInUpHidden
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-sage-800 mb-6">
              Why Choose Nirvanachai?
            </h2>
            <p className="text-lg sm:text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes our tea journey extraordinary and why tea
              lovers worldwide trust our heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const featureReveal = useScrollReveal({ threshold: 0.2 });

              return (
                <div
                  key={index}
                  ref={
                    featureReveal.elementRef as React.RefObject<HTMLDivElement>
                  }
                  className={`bg-card border border-border rounded-2xl p-6 lg:p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group ${fadeInUp} ${
                    featureReveal.isVisible ? fadeInUpVisible : fadeInUpHidden
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-semibold text-sage-800 mb-4 group-hover:text-sage-900 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sage-600 leading-relaxed text-sm sm:text-base group-hover:text-sage-700 transition-colors">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Sourcing Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={regionsRef.elementRef as React.RefObject<HTMLDivElement>}
            className={`text-center mb-16 ${fadeInUp} ${
              regionsRef.isVisible ? fadeInUpVisible : fadeInUpHidden
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-sage-800 mb-6">
              Global Sourcing, Local Soul
            </h2>
            <div className="text-lg sm:text-xl text-sage-700 max-w-4xl mx-auto leading-relaxed">
              <p className="mb-4">
                While proudly rooted in India's rich tea heritage, Nirvanachai
                goes beyond borders to source handpicked, high-grade teas from
                some of the most celebrated tea-growing regions in the world:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {regions.map((region, index) => {
              const regionReveal = useScrollReveal({ threshold: 0.3 });
              const regionImages = [
                teaImages.darjeeling,
                teaImages.assam,
                teaImages.kenya,
                teaImages.ceylon,
                teaImages.china,
                teaImages.vietnam,
              ];

              return (
                <div
                  key={index}
                  ref={
                    regionReveal.elementRef as React.RefObject<HTMLDivElement>
                  }
                  className={`group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${fadeInUp} ${
                    regionReveal.isVisible ? fadeInUpVisible : fadeInUpHidden
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Region Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <OptimizedImage
                      src={regionImages[index]}
                      alt={`${region.name} tea region`}
                      className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                      aspectRatio="landscape"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-3xl mr-2">{region.image}</span>
                      <span className="text-lg font-semibold">
                        {region.location}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl sm:text-2xl font-heading font-semibold text-sage-800 mb-3 group-hover:text-sage-900 transition-colors">
                      {region.name}
                    </h3>

                    <p className="text-sage-700 mb-4 font-medium text-sm sm:text-base">
                      {region.description}
                    </p>

                    <p className="text-sm text-sage-600 leading-relaxed">
                      {region.characteristics}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Heritage Story Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={heritageRef.elementRef as React.RefObject<HTMLDivElement>}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${fadeInUp} ${
              heritageRef.isVisible ? fadeInUpVisible : fadeInUpHidden
            }`}
          >
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-sage-800 mb-6 lg:mb-8">
                Three Generations of Tea Mastery
              </h2>
              <div className="space-y-6 text-sage-700 leading-relaxed text-base sm:text-lg">
                <p>
                  Our journey began three generations ago in the rolling hills
                  of India, where our ancestors first learned the ancient art of
                  tea cultivation and processing. What started as a family
                  tradition has grown into a global mission to share the finest
                  teas with the world.
                </p>
                <p>
                  Today, we honor this legacy by combining traditional knowledge
                  with modern quality standards, ensuring every cup of
                  Nirvanachai carries the wisdom of generations past and the
                  promise of excellence for generations to come.
                </p>
                <p className="text-chai-600 font-medium">
                  From our family to yours, we invite you to experience the
                  meditation in every sip, the mindfulness in every moment, and
                  the connection that only a perfect cup of tea can provide.
                </p>
              </div>
            </div>

            {/* Image and Promise Card */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Heritage Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={teaImages.heritage}
                  alt="Three generations of tea mastery"
                  className="w-full h-64 sm:h-80 lg:h-96"
                  aspectRatio="landscape"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-900/40 to-transparent"></div>
              </div>

              {/* Promise Card */}
              <div className="bg-gradient-to-br from-sage-100 to-clay-100 rounded-2xl p-6 lg:p-8 text-center shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-sage-200 rounded-full flex items-center justify-center">
                  <div className="text-3xl">🫖</div>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-sage-800 mb-4">
                  Our Promise
                </h3>
                <p className="text-sage-700 leading-relaxed text-sm sm:text-base">
                  Every tea in our collection is carefully selected, ethically
                  sourced, and packed with care to preserve the authentic
                  flavors and aromas that make each origin unique. We believe
                  that great tea should not only taste exceptional but also
                  support the communities that grow it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={teaImages.teaGarden}
            alt="Tea garden landscape"
            className="w-full h-full"
            aspectRatio="wide"
          />
          <div className="absolute inset-0 bg-sage-900/85"></div>
        </div>

        <div
          ref={valuesRef.elementRef as React.RefObject<HTMLDivElement>}
          className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${fadeInUp} ${
            valuesRef.isVisible ? fadeInUpVisible : fadeInUpHidden
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-8 lg:mb-16">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: "🌱",
                title: "Sustainability",
                description:
                  "We partner with farms that prioritize environmental stewardship and sustainable growing practices.",
              },
              {
                icon: "🤝",
                title: "Fair Trade",
                description:
                  "Our partnerships ensure fair wages and working conditions for tea growers and their communities.",
              },
              {
                icon: "✨",
                title: "Quality",
                description:
                  "We never compromise on quality, selecting only the finest leaves that meet our exacting standards.",
              },
            ].map((value, index) => {
              const valueReveal = useScrollReveal({ threshold: 0.3 });

              return (
                <div
                  key={index}
                  ref={
                    valueReveal.elementRef as React.RefObject<HTMLDivElement>
                  }
                  className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 group ${fadeInUp} ${
                    valueReveal.isVisible ? fadeInUpVisible : fadeInUpHidden
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl">{value.icon}</div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-sage-100 leading-relaxed text-sm sm:text-base">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
