import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-sage-600" />,
      title: "Phone Support",
      content: "+7 702 201 0652",
      description: "Mon-Fri 9AM-6PM (Almaty Time)",
      action: "tel:+77022010652"
    },
    {
      icon: <Mail className="h-6 w-6 text-sage-600" />,
      title: "Email Support",
      content: "support@nirvanachai.kz",
      description: "We typically respond within 24 hours",
      action: "mailto:support@nirvanachai.kz"
    },
    {
      icon: <MapPin className="h-6 w-6 text-sage-600" />,
      title: "Our Location",
      content: "Раимбек 165а",
      description: "Almaty, Kazakhstan",
      action: null
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-sage-600" />,
      title: "WhatsApp",
      content: "+7 702 201 0652",
      description: "Quick support via WhatsApp",
      action: "https://wa.me/77022010652"
    }
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "We offer express delivery within Kazakhstan (1-2 days) and international shipping (5-10 business days depending on location)."
    },
    {
      question: "Do you offer tea tasting guidance?",
      answer: "Absolutely! Our tea experts are happy to provide personalized recommendations based on your taste preferences and brewing experience."
    },
    {
      question: "Are your teas organic?",
      answer: "Many of our teas are certified organic. Look for the 'Organic' badge on product pages, and feel free to contact us for specific certifications."
    },
    {
      question: "Can I return or exchange teas?",
      answer: "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied, contact us for returns or exchanges."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sage-50 via-off-white to-clay-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-sage-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Have questions about our teas, need brewing advice, or want to learn more about our story? 
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="font-heading font-semibold text-sage-800 mb-2">
                  {info.title}
                </h3>
                {info.action ? (
                  <a 
                    href={info.action}
                    className="text-sage-600 hover:text-sage-800 font-medium block mb-2"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-sage-600 font-medium mb-2">
                    {info.content}
                  </p>
                )}
                <p className="text-sm text-sage-500">
                  {info.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold text-sage-800 mb-6">
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-heading font-semibold text-sage-800 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sage-600">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-sage-600 hover:text-sage-800 underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="brewing-advice">Brewing Advice</option>
                      <option value="order-support">Order Support</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Business Hours & Additional Info */}
            <div className="space-y-8">
              {/* Business Hours */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-xl font-heading font-bold text-sage-800 mb-6 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sage-600">Monday - Friday</span>
                    <span className="font-medium text-sage-800">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage-600">Saturday</span>
                    <span className="font-medium text-sage-800">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage-600">Sunday</span>
                    <span className="font-medium text-sage-800">Closed</span>
                  </div>
                </div>
                <p className="text-sm text-sage-500 mt-4">
                  All times are in Almaty Time Zone (GMT+6)
                </p>
              </div>

              {/* Quick Support */}
              <div className="bg-gradient-to-br from-teal-50 to-sage-50 border border-border rounded-2xl p-8">
                <h3 className="text-xl font-heading font-bold text-sage-800 mb-4">
                  Need Quick Help?
                </h3>
                <p className="text-sage-600 mb-6">
                  For immediate assistance, reach out via WhatsApp or check our FAQ section.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/77022010652"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <a
                    href="/faq"
                    className="border border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                  >
                    View FAQ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-sage-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-sage-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-heading font-semibold text-sage-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-sage-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/faq"
              className="inline-flex items-center text-sage-600 hover:text-sage-800 font-medium"
            >
              View all FAQs →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
