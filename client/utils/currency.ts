import currency from 'currency.js';
import countries from 'i18n-iso-countries';

// Initialize countries data
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

// Enhanced currency configuration
export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number;
  locale: string;
  precision: number;
  pattern: string;
  separator: string;
  decimal: string;
  fromCents: boolean;
}

// Comprehensive currency data
export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    exchangeRate: 1,
    locale: 'en-US',
    precision: 2,
    pattern: '!#',
    separator: ',',
    decimal: '.',
    fromCents: false
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    exchangeRate: 0.92,
    locale: 'de-DE',
    precision: 2,
    pattern: '# !',
    separator: '.',
    decimal: ',',
    fromCents: false
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    exchangeRate: 0.79,
    locale: 'en-GB',
    precision: 2,
    pattern: '!#',
    separator: ',',
    decimal: '.',
    fromCents: false
  },
  JPY: {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    exchangeRate: 149,
    locale: 'ja-JP',
    precision: 0,
    pattern: '!#',
    separator: ',',
    decimal: '.',
    fromCents: false
  },
  CNY: {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: '¥',
    exchangeRate: 7.24,
    locale: 'zh-CN',
    precision: 2,
    pattern: '!#',
    separator: ',',
    decimal: '.',
    fromCents: false
  },
  INR: {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    exchangeRate: 83.12,
    locale: 'en-IN',
    precision: 2,
    pattern: '!#',
    separator: ',',
    decimal: '.',
    fromCents: false
  },
  RUB: {
    code: 'RUB',
    name: 'Russian Ruble',
    symbol: '₽',
    exchangeRate: 95.50,
    locale: 'ru-RU',
    precision: 2,
    pattern: '# !',
    separator: ' ',
    decimal: ',',
    fromCents: false
  },
  KZT: {
    code: 'KZT',
    name: 'Kazakhstani Tenge',
    symbol: '₸',
    exchangeRate: 450.25,
    locale: 'kk-KZ',
    precision: 0,
    pattern: '# !',
    separator: ' ',
    decimal: ',',
    fromCents: false
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    exchangeRate: 1.35,
    locale: 'en-CA',
    precision: 2,
    pattern: '!#',
    separator: ',',
    decimal: '.',
    fromCents: false
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    exchangeRate: 1.52,
    locale: 'en-AU',
    precision: 2,
    pattern: '!#',
    separator: ',',
    decimal: '.',
    fromCents: false
  }
};

// Currency utility class
export class CurrencyUtility {
  private baseCurrency: string = 'USD';
  private currentCurrency: CurrencyConfig;

  constructor(currencyCode: string = 'USD') {
    this.currentCurrency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  }

  // Set current currency
  setCurrency(currencyCode: string): void {
    if (CURRENCIES[currencyCode]) {
      this.currentCurrency = CURRENCIES[currencyCode];
    }
  }

  // Get current currency info
  getCurrentCurrency(): CurrencyConfig {
    return this.currentCurrency;
  }

  // Convert amount from base currency to current currency
  convert(amount: number, fromCurrency: string = this.baseCurrency): number {
    const fromRate = CURRENCIES[fromCurrency]?.exchangeRate || 1;
    const toRate = this.currentCurrency.exchangeRate;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    return usdAmount * toRate;
  }

  // Format amount according to currency rules
  format(amount: number, options?: {
    showSymbol?: boolean;
    showCode?: boolean;
    precision?: number;
  }): string {
    const {
      showSymbol = true,
      showCode = false,
      precision = this.currentCurrency.precision
    } = options || {};

    const convertedAmount = this.convert(amount);
    
    const currencyInstance = currency(convertedAmount, {
      symbol: showSymbol ? this.currentCurrency.symbol : '',
      precision,
      pattern: this.currentCurrency.pattern,
      separator: this.currentCurrency.separator,
      decimal: this.currentCurrency.decimal,
      fromCents: this.currentCurrency.fromCents
    });

    let formatted = currencyInstance.format();
    
    if (showCode) {
      formatted = `${formatted} ${this.currentCurrency.code}`;
    }

    return formatted;
  }

  // Format with explicit currency
  formatAs(amount: number, currencyCode: string, options?: {
    showSymbol?: boolean;
    showCode?: boolean;
  }): string {
    const targetCurrency = CURRENCIES[currencyCode];
    if (!targetCurrency) return this.format(amount, options);

    const fromRate = this.currentCurrency.exchangeRate;
    const toRate = targetCurrency.exchangeRate;
    const convertedAmount = (amount / fromRate) * toRate;

    const {
      showSymbol = true,
      showCode = false
    } = options || {};

    const currencyInstance = currency(convertedAmount, {
      symbol: showSymbol ? targetCurrency.symbol : '',
      precision: targetCurrency.precision,
      pattern: targetCurrency.pattern,
      separator: targetCurrency.separator,
      decimal: targetCurrency.decimal,
      fromCents: targetCurrency.fromCents
    });

    let formatted = currencyInstance.format();
    
    if (showCode) {
      formatted = `${formatted} ${targetCurrency.code}`;
    }

    return formatted;
  }

  // Calculate savings amount
  calculateSavings(originalPrice: number, currentPrice: number): {
    amount: number;
    percentage: number;
    formatted: string;
  } {
    const savings = originalPrice - currentPrice;
    const percentage = (savings / originalPrice) * 100;
    
    return {
      amount: savings,
      percentage: Math.round(percentage),
      formatted: this.format(savings)
    };
  }

  // Get currency list for dropdowns
  static getCurrencyList(): Array<{
    code: string;
    name: string;
    symbol: string;
    flag?: string;
  }> {
    return Object.values(CURRENCIES).map(currency => ({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
      flag: getCurrencyFlag(currency.code)
    }));
  }

  // Get exchange rate between currencies
  getExchangeRate(fromCurrency: string, toCurrency: string): number {
    const fromRate = CURRENCIES[fromCurrency]?.exchangeRate || 1;
    const toRate = CURRENCIES[toCurrency]?.exchangeRate || 1;
    
    return toRate / fromRate;
  }

  // Format price range
  formatRange(minPrice: number, maxPrice: number): string {
    return `${this.format(minPrice)} - ${this.format(maxPrice)}`;
  }

  // Get localized number format
  getNumberFormat(): Intl.NumberFormat {
    return new Intl.NumberFormat(this.currentCurrency.locale, {
      style: 'currency',
      currency: this.currentCurrency.code,
      minimumFractionDigits: this.currentCurrency.precision,
      maximumFractionDigits: this.currentCurrency.precision
    });
  }
}

// Helper function to get currency flag emoji
function getCurrencyFlag(currencyCode: string): string {
  const flagMap: Record<string, string> = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    JPY: '🇯🇵',
    CNY: '🇨🇳',
    INR: '🇮🇳',
    RUB: '🇷🇺',
    KZT: '🇰🇿',
    CAD: '🇨🇦',
    AUD: '🇦🇺'
  };
  
  return flagMap[currencyCode] || '💱';
}

// Get suggested currency based on user location
export function getSuggestedCurrency(countryCode?: string): string {
  if (!countryCode) return 'USD';
  
  const currencyMap: Record<string, string> = {
    US: 'USD',
    CA: 'CAD',
    GB: 'GBP',
    EU: 'EUR',
    DE: 'EUR',
    FR: 'EUR',
    IT: 'EUR',
    ES: 'EUR',
    JP: 'JPY',
    CN: 'CNY',
    IN: 'INR',
    RU: 'RUB',
    KZ: 'KZT',
    AU: 'AUD'
  };
  
  return currencyMap[countryCode.toUpperCase()] || 'USD';
}

// Singleton instance for global use
export const currencyUtil = new CurrencyUtility();

// React hook for currency formatting
export function useCurrency(currencyCode?: string) {
  const util = new CurrencyUtility(currencyCode);
  
  return {
    format: (amount: number, options?: any) => util.format(amount, options),
    convert: (amount: number, fromCurrency?: string) => util.convert(amount, fromCurrency),
    formatAs: (amount: number, currency: string, options?: any) => util.formatAs(amount, currency, options),
    calculateSavings: (original: number, current: number) => util.calculateSavings(original, current),
    getCurrentCurrency: () => util.getCurrentCurrency(),
    setCurrency: (code: string) => util.setCurrency(code)
  };
}
