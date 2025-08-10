import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        shop: "Shop",
        about: "About",
        contact: "Contact",
        account: "My Account",
        cart: "Cart",
        search: "Search",
      },

      // Hero section - Enhanced with emotional appeal
      hero: {
        title1: "Discover Your",
        title2: "Perfect Cup",
        subtitle:
          "From ancient gardens to your cup — experience the art of mindful tea drinking that connects cultures, generations, and moments of pure tranquility.",
        cta_primary: "Start Your Journey",
        cta_secondary: "Explore Collection",
        scroll_hint: "Scroll to explore our story",
      },

      // Why Choose section - Enhanced copy
      why_choose: {
        title: "Why Tea Lovers Choose Nirvanachai",
        subtitle:
          "Discover the difference that three generations of passion, premium sourcing, and mindful curation make in every sip.",
        expertise: "Three generations of mastery",
        expertise_desc:
          "Traditional wisdom passed down through generations of tea artisans",
        global: "Ethically sourced worldwide",
        global_desc:
          "Premium teas from the world's most celebrated tea gardens",
        curated: "Mindfully crafted blends",
        curated_desc:
          "Each blend tells a story of flavor, aroma, and cultural heritage",
        pure: "Pure, natural ingredients",
        pure_desc: "No artificial additives — just the pure essence of tea",
        sustainable: "Sustainably cultivated",
        sustainable_desc:
          "Supporting communities and preserving tea traditions",
        fresh: "Peak freshness guaranteed",
        fresh_desc: "From garden to cup in days, not months",
      },

      // Global Sourcing - Enhanced storytelling
      global_sourcing: {
        title: "A Global Tea Journey",
        subtitle:
          "Each region we source from has been carefully selected for its unique terroir, time-honored traditions, and exceptional quality. Discover the stories behind every leaf.",
        learn_story: "Discover Our Heritage",
        darjeeling: "The Champagne of Teas",
        assam: "Bold & Robust Character",
        kenya: "Bright African Excellence",
        ceylon: "High-Grown Purity",
        china: "Ancient Tea Wisdom",
        vietnam: "Delicate Mountain Teas",
      },

      // Featured Products - Conversion-focused
      featured: {
        title: "Bestselling Tea Collections",
        subtitle:
          "Join thousands of tea lovers who have discovered their perfect cup with our most beloved blends.",
        add_to_cart: "Add to Cart",
        view_all: "Shop All Teas",
        bestseller: "Bestseller",
        new: "New",
        limited: "Limited Edition",
      },

      // Newsletter - FOMO and value-driven
      newsletter: {
        title: "Join 10,000+ Tea Enthusiasts",
        subtitle:
          "Get exclusive access to new blends, brewing secrets, and special offers before anyone else.",
        email_placeholder: "Enter your email address",
        subscribe: "Get Exclusive Access",
        no_spam: "Premium content only. Unsubscribe anytime.",
        benefit1: "🎁 20% off your first order",
        benefit2: "🍃 Early access to new blends",
        benefit3: "📚 Free brewing guides",
      },

      // Contact Info
      contact: {
        phone: "+7 702 201 0652",
        email: "support@nirvanachai.kz",
        address: "Раимбек 165а, Almaty, Kazakhstan",
        whatsapp_tooltip: "Chat with us on WhatsApp",
      },

      // Common CTAs - Optimized for conversion
      cta: {
        shop_now: "Shop Now",
        learn_more: "Learn More",
        get_started: "Get Started",
        try_free: "Try Risk-Free",
        join_now: "Join Now",
        discover: "Discover",
        explore: "Explore",
        continue: "Continue",
        add_to_cart: "Add to Cart",
        buy_now: "Buy Now",
        free_shipping: "Free Shipping",
        money_back: "30-Day Money Back",
      },

      // Shipping & Location
      shipping: {
        estimated_delivery: "Estimated delivery",
        free_shipping_from: "Free shipping from",
        your_location: "Shipping to",
        change_location: "Change location",
        local_currency: "Prices in",
      },

      // Trust indicators
      trust: {
        secure_checkout: "Secure Checkout",
        money_back: "30-Day Money Back Guarantee",
        fast_delivery: "Fast Worldwide Delivery",
        customer_support: "24/7 Customer Support",
        trusted_by: "Trusted by 10,000+ customers",
      },
    },
  },

  ru: {
    translation: {
      // Navigation
      nav: {
        home: "Главная",
        shop: "Магазин",
        about: "О нас",
        contact: "Контакты",
        account: "Мой аккаунт",
        cart: "Корзина",
        search: "Поиск",
      },

      // Hero section
      hero: {
        title1: "Откройте Свою",
        title2: "Идеальную Чашку",
        subtitle:
          "От древних садов до вашей чашки — испытайте искусство осознанного чаепития, которое соединяет культуры, поколения и моменты чистого спокойствия.",
        cta_primary: "Начать Путешествие",
        cta_secondary: "Изучить Коллекцию",
        scroll_hint: "Прокрутите, чтобы изучить нашу историю",
      },

      // Why Choose section
      why_choose: {
        title: "Почему любители чая выбирают Nirvanachai",
        subtitle:
          "Откройте для себя разницу, которую создают три поколения страсти, премиальные источники и внимательная курация в каждом глотке.",
        expertise: "Три поколения мастерства",
        expertise_desc:
          "Традиционная мудрость, передаваемая поколениями чайных мастеров",
        global: "Этично поставляемый по всему миру",
        global_desc: "Премиальные чаи из самых известных чайных садов мира",
        curated: "Внимательно созданные смеси",
        curated_desc:
          "Каждая смесь рассказывает историю вкуса, аромата и культурного наследия",
        pure: "Чистые, натуральные ингредиенты",
        pure_desc: "Никаких искусственных добавок — только чистая суть чая",
        sustainable: "Устойчиво выращенный",
        sustainable_desc: "Поддержка сообществ и сохранение чайных традиций",
        fresh: "Гарантированная свежесть",
        fresh_desc: "От сада до чашки за дни, а не месяцы",
      },

      // Global Sourcing
      global_sourcing: {
        title: "Глобальное Чайное ��утешествие",
        subtitle:
          "Каждый регион, из которого мы получаем сырье, был тщательно отобран за его уникальный терруар, вековые традиции и исключительное качество.",
        learn_story: "Узнать Нашу Историю",
        darjeeling: "Шампанское среди чаев",
        assam: "Смелый и крепкий характер",
        kenya: "Яркое африканское превосходство",
        ceylon: "Высокогорная чистота",
        china: "Древняя чайная мудрость",
        vietnam: "Деликатные горные чаи",
      },

      // Featured Products
      featured: {
        title: "Бестселлеры Чайных Коллекций",
        subtitle:
          "Присоединяйтесь к тысячам любителей чая, которые нашли свою идеальную чашку с нашими самыми любимыми смесями.",
        add_to_cart: "В корзину",
        view_all: "Все чаи",
        bestseller: "Бестселлер",
        new: "Новинка",
        limited: "Лимитированная серия",
      },

      // Newsletter
      newsletter: {
        title: "Присоединяйтесь к 10,000+ Ценителей Чая",
        subtitle:
          "Получите эксклюзивный доступ к новым смесям, секретам заваривания и специальным предложениям раньше всех.",
        email_placeholder: "Введите ваш email",
        subscribe: "Получить Эксклюзивный Доступ",
        no_spam: "Только премиум контент. Отписка в любое время.",
        benefit1: "🎁 20% скидка на первый заказ",
        benefit2: "🍃 Ранний доступ к новым смесям",
        benefit3: "📚 Бесплатные гиды по завариванию",
      },

      // Contact Info
      contact: {
        phone: "+7 702 201 0652",
        email: "support@nirvanachai.kz",
        address: "Раимбек 165а, Алматы, Казахстан",
        whatsapp_tooltip: "Напишите нам в WhatsApp",
      },

      // CTAs
      cta: {
        shop_now: "Купить сейчас",
        learn_more: "Узнать больше",
        get_started: "Начать",
        try_free: "Попробовать без риска",
        join_now: "Присоединиться",
        discover: "Открыть",
        explore: "Изучить",
        continue: "Продолжить",
        add_to_cart: "В корзину",
        buy_now: "Купить сейчас",
        free_shipping: "Бесплатная доставка",
        money_back: "30 дней возврата денег",
      },

      // Shipping & Location
      shipping: {
        estimated_delivery: "Ожидаемая доставка",
        free_shipping_from: "Бесплатная доставка от",
        your_location: "Доставка в",
        change_location: "Изменить местоположение",
        local_currency: "Цены в",
      },

      // Trust indicators
      trust: {
        secure_checkout: "Безопасная оплата",
        money_back: "30-дневная гарантия возврата денег",
        fast_delivery: "Быстрая доставка по всему миру",
        customer_support: "Поддержка клиентов 24/7",
        trusted_by: "Нам доверяют 10,000+ клиентов",
      },
    },
  },

  kz: {
    translation: {
      // Navigation
      nav: {
        home: "Басты бет",
        shop: "Дүкен",
        about: "Біз туралы",
        contact: "Байланыс",
        account: "Менің аккаунтым",
        cart: "Себет",
        search: "Іздеу",
      },

      // Hero section
      hero: {
        title1: "Өзіңіздің",
        title2: "Керемет Кесеңізді Табыңыз",
        subtitle:
          "Ежелгі бақтардан сіздің кесеңізге дейін — мәдениеттер, ұрпақтар мен таза тыныштық сәттерін байланыстыратын саналы шай ішу өнерін сезініңіз.",
        cta_primary: "Саяхатты Бастау",
        cta_secondary: "Коллекцияны Зерттеу",
        scroll_hint: "Біздің тарихымызды зерттеу үшін төмен жылжытыңыз",
      },

      // Why Choose section
      why_choose: {
        title: "Шай сүйушілер неліктен Nirvanachai таңдайды",
        subtitle:
          "Әр ішімде үш ұрпақтың құмарлығы, сапалы дереккөздер және мұқият курацияның жасайтын айырмашылығын табыңыз.",
        expertise: "Үш ұрпақтың шеберлігі",
        expertise_desc:
          "Шай шеберлерінің ұрпақтарымен берілетін дәстүрлі данышпандық",
        global: "Әлемдік этикалық дереккөздер",
        global_desc: "Әлемдегі ең танымал шай бақтарынан сапалы шайлар",
        curated: "Мұқият жасалған қоспалар",
        curated_desc:
          "Әр қоспа дәм, хош иіс және мәдени мұраның тарихын айтады",
        pure: "Таза, табиғи ингредиенттер",
        pure_desc: "Жасанды қоспалар жоқ — тек шайдың таза маңызы",
        sustainable: "Тұрақты өсірілген",
        sustainable_desc: "Қауымдастықтарды қолдау және шай дәстүрлерін сақтау",
        fresh: "Кепілді тазалық",
        fresh_desc: "Бақтан кесеге дейін айлар емес, күндер ішінде",
      },

      // Global Sourcing
      global_sourcing: {
        title: "Ғаламдық Шай Саяхаты",
        subtitle:
          "Біз дереккөз алатын әр өңір өзінің бірегей терруары, ғасырлық дәстүрлері және е��екше сапасы үшін мұқият таңдалған.",
        learn_story: "Біздің Мұрамызды Білу",
        darjeeling: "Шайлардың шампаны",
        assam: "Батыл және берік сипат",
        kenya: "Жарқын африкалық үздік",
        ceylon: "Биік таулы тазалық",
        china: "Ежелгі шай данышпандығы",
        vietnam: "Нәзік тау шайлары",
      },

      // Featured Products
      featured: {
        title: "Сатылым Көшбасшылары",
        subtitle:
          "Біздің ең сүйікті қоспаларымызбен өздерінің керемет кесесін тапқан мыңдаған шай сүйушілерге қосылыңыз.",
        add_to_cart: "Себетке Қосу",
        view_all: "Барлық Шайлар",
        bestseller: "Бестселлер",
        new: "Жаңа",
        limited: "Шектеулі серия",
      },

      // Newsletter
      newsletter: {
        title: "10,000+ Шай Қанаушыларына Қосылыңыз",
        subtitle:
          "Жаңа қоспалар, дайындау құпиялары және басқаларға дейін арнайы ұсыныстарға э��склюзивті қол жеткізуді алыңыз.",
        email_placeholder: "Email мекенжайыңызды енгізіңіз",
        subscribe: "Эксклюзивті Қол Жеткі��у Алу",
        no_spam:
          "Тек премиум контент. Кез келген уақытта жазылудан бас тартыңыз.",
        benefit1: "🎁 Бірінші тапсырысқа 20% жеңілдік",
        benefit2: "🍃 Жаңа қоспаларға ерте қол жеткізу",
        benefit3: "📚 Тегін дайындау нұсқаулықтары",
      },

      // Contact Info
      contact: {
        phone: "+7 702 201 0652",
        email: "support@nirvanachai.kz",
        address: "Раимбек 165а, Алматы, Қазақстан",
        whatsapp_tooltip: "WhatsApp арқылы бізбен чаттасыңыз",
      },

      // CTAs
      cta: {
        shop_now: "Қазір сатып алу",
        learn_more: "Көбірек білу",
        get_started: "Бастау",
        try_free: "Тәуекелсіз сынау",
        join_now: "Қазір қосылу",
        discover: "Ашу",
        explore: "Зерттеу",
        continue: "Жалғастыру",
        add_to_cart: "Себетке қосу",
        buy_now: "Қазір сатып алу",
        free_shipping: "Тегін жеткізу",
        money_back: "30 күн ақша қайтару",
      },

      // Shipping & Location
      shipping: {
        estimated_delivery: "Болжамды жеткізу",
        free_shipping_from: "Тегін жеткізу бастап",
        your_location: "Жеткізу",
        change_location: "Орынды өзгерту",
        local_currency: "Бағалар",
      },

      // Trust indicators
      trust: {
        secure_checkout: "Қауіпсіз төлем",
        money_back: "30 күндік ақша қайтару кепілдігі",
        fast_delivery: "Әлемдік жылдам жеткізу",
        customer_support: "24/7 тұтынушыларды қолдау",
        trusted_by: "10,000+ тұтынушы сенеді",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
