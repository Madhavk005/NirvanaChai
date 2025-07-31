import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Globe, User, Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguageCurrency } from '../contexts/LanguageCurrencyContext';
import { FloatingActions } from './FloatingActions';
import { AnnouncementBar } from './AnnouncementBar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const location = useLocation();
  const { currentLanguage, languages, setLanguage, currentCurrency, currencies, setCurrency, t } = useLanguageCurrency();

  const languageRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: t('nav.home', 'Home'), href: '/' },
    { name: t('nav.shop', 'Shop'), href: '/shop' },
    { name: t('nav.about', 'About'), href: '/about' },
    { name: t('nav.contact', 'Contact'), href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border transition-all duration-300 shadow-sm">
        {/* Top Bar */}
        <div className="bg-sage/10 py-2 px-4 text-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-6 text-sage-700">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>+7 702 201 0652</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>support@nirvanachai.kz</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-1 text-sage-700 hover:text-sage-900 transition-colors group"
                >
                  <Globe className="h-3 w-3" />
                  <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-background border border-border rounded-lg shadow-lg z-50 py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`w-full px-4 py-2 text-left hover:bg-sage-50 flex items-center space-x-3 transition-colors ${
                          currentLanguage.code === lang.code ? 'bg-sage-100 text-sage-800' : 'text-sage-600'
                        }`}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <div className="flex flex-col">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-xs text-sage-500">{lang.nativeName}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Currency Selector */}
              <div className="relative" ref={currencyRef}>
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="flex items-center space-x-1 text-sage-700 hover:text-sage-900 transition-colors"
                >
                  <span className="font-medium">{currentCurrency.code}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCurrencyOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-background border border-border rounded-lg shadow-lg z-50 py-1">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        className={`w-full px-4 py-2 text-left hover:bg-sage-50 flex items-center justify-between transition-colors ${
                          currentCurrency.code === currency.code ? 'bg-sage-100 text-sage-800' : 'text-sage-600'
                        }`}
                        onClick={() => {
                          setCurrency(currency);
                          setIsCurrencyOpen(false);
                        }}
                      >
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-sage-500">{currency.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="text-xl sm:text-2xl font-heading font-semibold text-sage-700 group-hover:text-sage-800 transition-colors">
                Nirvana Chai
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-all duration-200 hover:text-primary relative group ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-200 ${
                    location.pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <button className="p-2 hover:bg-muted rounded-md transition-all duration-200 hover:scale-110">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <Link to="/account" className="p-2 hover:bg-muted rounded-md transition-all duration-200 hover:scale-110">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link to="/cart" className="p-2 hover:bg-muted rounded-md relative group transition-all duration-200 hover:scale-110">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-sage-600 to-chai-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold shadow-lg border-2 border-white">
                  0
                </span>
                {/* Pulse animation for new items */}
                <div className="absolute -top-1 -right-1 bg-sage-600 rounded-full h-4 w-4 sm:h-5 sm:w-5 animate-ping opacity-75"></div>
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-muted rounded-md transition-all duration-200 hover:scale-110"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="mt-4 pb-6 border-t border-border bg-sage-50/50 rounded-b-lg mx-4 sm:mx-6">
              <div className="pt-4 px-4 space-y-1">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 text-base font-medium transition-all duration-200 hover:text-primary hover:bg-white rounded-lg transform ${
                      isMobileMenuOpen ? 'translate-x-0' : 'translate-x-4'
                    } ${
                      location.pathname === item.href
                        ? 'text-primary bg-white shadow-sm'
                        : 'text-muted-foreground'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-sage-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-heading font-semibold mb-4">Nirvana Chai</h3>
              <p className="text-sage-200 mb-4">
                More than a drink — tea is a daily ritual, a quiet companion, and a global connector. 
                Join us on a journey that spans continents and generations.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+7 702 201 0652</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@nirvanachai.kz</span>
                </div>
                <div>📍 Раимбек 165а, Almaty, Kazakhstan</div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shop" className="text-sage-200 hover:text-white">Shop</Link></li>
                <li><Link to="/about" className="text-sage-200 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-sage-200 hover:text-white">Contact</Link></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/faq" className="text-sage-200 hover:text-white">FAQ</Link></li>
                <li><Link to="/shipping" className="text-sage-200 hover:text-white">Shipping</Link></li>
                <li><Link to="/returns" className="text-sage-200 hover:text-white">Returns</Link></li>
                <li><Link to="/privacy" className="text-sage-200 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sage-800 mt-8 pt-8 text-center text-sm text-sage-300">
            <p>&copy; 2025 Nirvana Chai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Actions */}
      <FloatingActions />
    </div>
  );
}
