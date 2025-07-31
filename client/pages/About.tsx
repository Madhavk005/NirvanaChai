import { Leaf, Globe, Award, Heart, Recycle, Package } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Award className="h-12 w-12 text-sage-600" />,
      title: "Three generations of expertise",
      description: "Crafted with knowledge passed down through generations of tea masters"
    },
    {
      icon: <Globe className="h-12 w-12 text-sage-600" />,
      title: "Sourced from India, Sri Lanka, Kenya, China, and Vietnam",
      description: "Handpicked from the world's most celebrated tea-growing regions"
    },
    {
      icon: <Leaf className="h-12 w-12 text-sage-600" />,
      title: "Curated blends & single-origin offerings",
      description: "Carefully selected premium teas and expertly crafted signature blends"
    },
    {
      icon: <Heart className="h-12 w-12 text-sage-600" />,
      title: "Pure ingredients, no artificial additives",
      description: "Just pure, natural tea leaves and botanicals in every cup"
    },
    {
      icon: <Recycle className="h-12 w-12 text-sage-600" />,
      title: "Sustainably sourced, ethically crafted",
      description: "Respecting our planet and supporting tea-growing communities"
    },
    {
      icon: <Package className="h-12 w-12 text-sage-600" />,
      title: "Freshly packed for maximum aroma & flavor",
      description: "Premium quality preserved in every package we send"
    }
  ];

  const regions = [
    {
      name: "Darjeeling",
      location: "Himalayan foothills, India",
      description: "Elegant, floral teas from the Himalayan foothills",
      image: "🏔️",
      characteristics: "Known for its delicate muscatel flavor and golden liquor, Darjeeling teas are often called the 'Champagne of Teas'."
    },
    {
      name: "Assam", 
      location: "Northeast India",
      description: "Bold, malty black teas with deep character",
      image: "🌿",
      characteristics: "Rich, full-bodied teas perfect for breakfast blends, with a distinctive malty sweetness and robust flavor."
    },
    {
      name: "Kenya",
      location: "East Africa",
      description: "Bright, brisk flavors ideal for rich blends",
      image: "🦒",
      characteristics: "High-grown teas with exceptional brightness and strength, perfect for adding body to breakfast blends."
    },
    {
      name: "Ceylon",
      location: "Sri Lanka",
      description: "Crisp, citrusy profiles from high-grown estates",
      image: "🌴",
      characteristics: "Clean, bright teas with citrusy notes and excellent clarity, grown in high-altitude gardens."
    },
    {
      name: "China",
      location: "Various provinces",
      description: "Ancient tea traditions and refined green, white, and oolong varieties",
      image: "🏮",
      characteristics: "The birthplace of tea, offering diverse flavors from delicate whites to complex oolongs and earthy pu-erhs."
    },
    {
      name: "Vietnam",
      location: "Southeast Asia",
      description: "Smooth, delicate teas with unique regional character",
      image: "🎋",
      characteristics: "Artisanal teas with unique processing methods, offering smooth, clean flavors with distinctive regional notes."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-sage-50 via-off-white to-clay-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-sage-800 mb-6">
            Experience Nirvanachai
          </h1>
          
          <div className="text-lg md:text-xl text-sage-700 leading-relaxed space-y-4 max-w-3xl mx-auto">
            <p>
              More than a drink — tea is a daily ritual, a quiet companion, and a global connector.
            </p>
            <p>
              Join us on a journey that spans continents and generations.
            </p>
            <p className="text-chai-600 font-medium text-xl">
              Savor the story, sip the soul — with Nirvanachai.
            </p>
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-sage-800 mb-6">
              Global Sourcing, Local Soul
            </h2>
            <div className="text-lg text-sage-700 max-w-4xl mx-auto leading-relaxed">
              <p className="mb-4">
                While proudly rooted in India's rich tea heritage, Nirvanachai goes beyond borders to source 
                handpicked, high-grade teas from some of the most celebrated tea-growing regions in the world:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{region.image}</span>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-sage-800">
                      {region.name}
                    </h3>
                    <p className="text-sm font-medium text-sage-600">
                      {region.location}
                    </p>
                  </div>
                </div>
                
                <p className="text-sage-700 mb-3 font-medium">
                  {region.description}
                </p>
                
                <p className="text-sm text-sage-600 leading-relaxed">
                  {region.characteristics}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Story Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-sage-800 mb-6">
                Three Generations of Tea Mastery
              </h2>
              <div className="space-y-4 text-sage-700 leading-relaxed">
                <p>
                  Our journey began three generations ago in the rolling hills of India, where our ancestors 
                  first learned the ancient art of tea cultivation and processing. What started as a family 
                  tradition has grown into a global mission to share the finest teas with the world.
                </p>
                <p>
                  Today, we honor this legacy by combining traditional knowledge with modern quality standards, 
                  ensuring every cup of Nirvanachai carries the wisdom of generations past and the promise 
                  of excellence for generations to come.
                </p>
                <p>
                  From our family to yours, we invite you to experience the meditation in every sip, 
                  the mindfulness in every moment, and the connection that only a perfect cup of tea can provide.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-sage-100 to-clay-100 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-6">🫖</div>
              <h3 className="text-2xl font-heading font-semibold text-sage-800 mb-4">
                Our Promise
              </h3>
              <p className="text-sage-700 leading-relaxed">
                Every tea in our collection is carefully selected, ethically sourced, and packed with care 
                to preserve the authentic flavors and aromas that make each origin unique. We believe that 
                great tea should not only taste exceptional but also support the communities that grow it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-sage-800 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-12">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl">🌱</div>
              <h3 className="text-xl font-heading font-semibold">Sustainability</h3>
              <p className="text-sage-200">
                We partner with farms that prioritize environmental stewardship and sustainable growing practices.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-4xl">🤝</div>
              <h3 className="text-xl font-heading font-semibold">Fair Trade</h3>
              <p className="text-sage-200">
                Our partnerships ensure fair wages and working conditions for tea growers and their communities.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-4xl">✨</div>
              <h3 className="text-xl font-heading font-semibold">Quality</h3>
              <p className="text-sage-200">
                We never compromise on quality, selecting only the finest leaves that meet our exacting standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
