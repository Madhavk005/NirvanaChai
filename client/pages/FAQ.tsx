import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      category: "Orders & Shipping",
      items: [
        {
          question: "How long does shipping take?",
          answer: "We offer different shipping options: Express delivery within Kazakhstan (1-2 days), Standard international shipping (5-10 business days), and Premium express international (2-5 business days). All orders are processed within 24 hours on business days."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes! We ship worldwide from our facility in Almaty, Kazakhstan. We have optimized shipping routes to Russia, India, Europe, and North America. Shipping costs are calculated at checkout based on your location and order weight."
        },
        {
          question: "What are your shipping costs?",
          answer: "Free shipping on orders over $50 within Kazakhstan. International shipping starts at $9.99 for standard delivery. Express shipping options are available at checkout with real-time pricing based on destination and weight."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can also track your order status in your account dashboard or contact our support team for updates."
        },
        {
          question: "What if my order is damaged or lost?",
          answer: "We take full responsibility for orders until they reach you safely. If your package arrives damaged or goes missing, contact us immediately. We'll send a replacement at no extra cost or provide a full refund."
        }
      ]
    },
    {
      category: "Products & Quality",
      items: [
        {
          question: "Are your teas organic?",
          answer: "Many of our teas are certified organic, and we clearly mark organic products with badges on our website. We partner with farms that follow sustainable and organic practices, even when not certified. Look for the 'Organic' badge on product pages."
        },
        {
          question: "How do you ensure tea freshness?",
          answer: "We source teas directly from gardens and process them immediately. Our teas are packed in airtight, light-proof containers within days of processing. We maintain optimal storage conditions and have a high inventory turnover to ensure you receive the freshest possible tea."
        },
        {
          question: "What's the shelf life of your teas?",
          answer: "When stored properly in a cool, dry place away from light and air, our teas maintain peak quality for 2-3 years. Black teas last longest, while green and white teas are best enjoyed within 1-2 years. We include best-by dates on all packaging."
        },
        {
          question: "Do you have caffeine-free options?",
          answer: "Yes! We offer several herbal blends that are naturally caffeine-free, including our Morning Serenity (chamomile-based) and Evening Bliss (lavender blend). These are perfect for evening drinking or those avoiding caffeine."
        },
        {
          question: "Can you recommend teas for beginners?",
          answer: "Absolutely! For black tea beginners, try our Earl Grey Supreme or Assam Breakfast. For green tea newcomers, Dragon Well Green is wonderfully approachable. Our herbal blends like Morning Serenity are perfect for anyone new to tea."
        }
      ]
    },
    {
      category: "Brewing & Preparation",
      items: [
        {
          question: "What's the best way to brew your teas?",
          answer: "Each tea type has optimal brewing parameters. Generally: Black teas need boiling water (100°C) for 3-5 minutes, Green teas need 70-80°C for 2-3 minutes, Oolong teas need 90-95°C for 3-4 minutes, White teas need 75-85°C for 4-6 minutes. We include detailed brewing instructions with every order."
        },
        {
          question: "How much tea should I use per cup?",
          answer: "We recommend 1 teaspoon (2-3 grams) of loose leaf tea per 8 oz cup of water. For stronger teas like Assam, you might use slightly less. For delicate teas like white teas, you might use slightly more. Adjust to your taste preference."
        },
        {
          question: "Can I reuse tea leaves?",
          answer: "Yes! High-quality loose leaf teas, especially oolongs and pu-erhs, can be steeped multiple times. Each steeping reveals different flavor notes. Green and white teas typically give 2-3 good steepings, while oolongs can go 4-6 times."
        },
        {
          question: "What water should I use for brewing?",
          answer: "Use filtered or spring water when possible. Hard water with high mineral content can affect taste, while distilled water lacks minerals that enhance flavor. The ideal water temperature varies by tea type - we provide specific guidelines with each tea."
        }
      ]
    },
    {
      category: "Account & Returns",
      items: [
        {
          question: "How do I create an account?",
          answer: "Click 'My Account' in the top navigation and select 'Create Account'. You'll need to provide your name, email, and create a password. Having an account allows you to track orders, save favorites, and receive personalized recommendations."
        },
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your tea, contact us within 30 days of delivery for a full refund or exchange. Tea must be unopened for hygiene reasons, except in cases of quality issues."
        },
        {
          question: "How do I return or exchange a product?",
          answer: "Contact our customer service team at support@nirvanachai.kz or +7 702 201 0652. We'll provide a return authorization and shipping label. Once we receive your return, we'll process your refund within 5-7 business days."
        },
        {
          question: "Can I cancel my order?",
          answer: "Yes, if your order hasn't shipped yet. Contact us immediately at support@nirvanachai.kz or call +7 702 201 0652. Orders are typically processed within 24 hours, so quick communication is important for cancellations."
        }
      ]
    },
    {
      category: "Wholesale & Partnerships",
      items: [
        {
          question: "Do you offer wholesale pricing?",
          answer: "Yes! We work with cafes, restaurants, and retailers worldwide. Wholesale pricing starts with minimum orders of $500. Contact us at support@nirvanachai.kz with your business details for a custom quote and catalog."
        },
        {
          question: "Can I become a Nirvanachai distributor?",
          answer: "We're always interested in partnering with like-minded businesses. We offer exclusive territorial distribution rights in select markets. Contact us with your business plan and market information for consideration."
        },
        {
          question: "Do you offer custom blending services?",
          answer: "Yes! We can create custom blends for restaurants, hotels, or special events. Minimum order quantities apply. Our tea masters will work with you to develop signature blends that reflect your brand or occasion."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-sage-50 via-off-white to-clay-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-sage-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions about our teas, shipping, brewing, and more. 
            Can't find what you're looking for? We're here to help!
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 bg-white"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-heading font-bold text-sage-800 mb-6">
                    {category.category}
                  </h2>
                  
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex;
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div
                          key={itemIndex}
                          className="bg-card border border-border rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-sage-50 transition-colors"
                          >
                            <h3 className="font-semibold text-sage-800 pr-4">
                              {item.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-sage-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-sage-600 flex-shrink-0" />
                            )}
                          </button>
                          
                          {isOpen && (
                            <div className="px-6 pb-4">
                              <p className="text-sage-600 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-heading font-semibold text-sage-800 mb-2">
                No results found
              </h3>
              <p className="text-sage-600 mb-6">
                Try searching with different keywords or browse all categories.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-sage-600 hover:text-sage-800 underline"
              >
                Clear search and show all FAQs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-sage-800 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-sage-600 mb-8">
            Our tea experts are here to help you find the perfect brew and answer any questions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Support
            </a>
            <a
              href="https://wa.me/77022010652"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
