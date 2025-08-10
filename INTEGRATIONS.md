# Integrated Libraries Documentation

This document outlines all the libraries integrated into the Nirvana Chai project and how to use them effectively.

## 🎯 Overview

The project integrates several powerful libraries to provide a modern, feature-rich e-commerce experience:

- **Zustand** - State management for cart, wishlist, and recently viewed
- **Jotai** - Additional atomic state management
- **Fuse.js** - Fuzzy search autocomplete
- **react-toastify** - Toast notifications
- **framer-motion** - Animations and transitions
- **@headlessui/react** - Headless UI components
- **@heroicons/react** - Icon library
- **react-i18next** - Internationalization

## 📦 Library Details

### 1. Zustand - State Management

**Purpose**: Primary state management for cart, wishlist, recently viewed, and UI state.

**Key Features**:
- Persistent storage with localStorage
- Type-safe stores
- Optimized re-renders
- Dark mode support

**Usage**:
```typescript
import { useCartStore, useWishlistStore, useUIStore } from '../stores/useStore';

// Cart operations
const { addItem, removeItem, getTotalItems } = useCartStore();
addItem(product, 2);

// Wishlist operations
const { addItem, removeItem, isInWishlist } = useWishlistStore();
addItem(productId);

// UI state
const { isDarkMode, toggleDarkMode } = useUIStore();
```

**Available Stores**:
- `useCartStore` - Shopping cart management
- `useWishlistStore` - Wishlist functionality
- `useRecentlyViewedStore` - Recently viewed products
- `useUIStore` - UI state (dark mode, modals, notifications)

### 2. Jotai - Atomic State Management

**Purpose**: Additional state management for smaller, atomic pieces of state.

**Usage**:
```typescript
import { atom, useAtom } from 'jotai';

const searchQueryAtom = atom('');
const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
```

### 3. Fuse.js - Fuzzy Search

**Purpose**: Lightweight fuzzy search for product autocomplete.

**Features**:
- Fuzzy matching with configurable threshold
- Search across multiple fields (name, description, tags, region)
- Keyboard navigation
- Recently viewed suggestions

**Usage**:
```typescript
import SearchAutocomplete from '../components/SearchAutocomplete';

<SearchAutocomplete
  products={products}
  onProductSelect={handleProductSelect}
  onSearch={handleSearch}
  placeholder="Search teas..."
/>
```

**Configuration**:
- Threshold: 0.3 (lower = more strict matching)
- Search fields: name, description, tags, region, badges
- Max results: 8 items
- Min match length: 2 characters

### 4. react-toastify - Toast Notifications

**Purpose**: User-friendly toast notifications for user actions.

**Features**:
- Multiple toast types (success, error, info, warning)
- Custom toast components
- Auto-dismiss with configurable duration
- Position customization

**Usage**:
```typescript
import { toast } from 'react-toastify';

// Basic usage
toast.success('Product added to cart!');
toast.error('Something went wrong');
toast.info('Loading products...');

// Custom toast
toast.custom((t) => (
  <div className="custom-toast">
    <h3>Custom Toast</h3>
    <p>With custom content</p>
  </div>
));
```

### 5. framer-motion - Animations

**Purpose**: Smooth animations and transitions throughout the application.

**Features**:
- Page transitions
- Component animations
- Gesture support
- Layout animations

**Usage**:
```typescript
import { motion, AnimatePresence } from 'framer-motion';

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// List animations
<AnimatePresence>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
    >
      {item.content}
    </motion.div>
  ))}
</AnimatePresence>
```

### 6. @headlessui/react - Headless UI Components

**Purpose**: Accessible, unstyled UI components.

**Available Components**:
- Dialog (modals)
- Menu (dropdowns)
- Listbox (select)
- Combobox (autocomplete)
- Switch (toggles)

**Usage**:
```typescript
import { Dialog, Menu, Switch } from '@headlessui/react';

// Dialog example
<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
  <Dialog.Panel>
    <Dialog.Title>Modal Title</Dialog.Title>
    <Dialog.Description>Modal description</Dialog.Description>
  </Dialog.Panel>
</Dialog>
```

### 7. @heroicons/react - Icons

**Purpose**: Beautiful, consistent icon library.

**Usage**:
```typescript
import { ShoppingCart, Heart, User } from '@heroicons/react/24/outline';

<ShoppingCart className="h-6 w-6" />
<Heart className="h-6 w-6 fill-current" />
```

**Available Variants**:
- `24/outline` - Outline icons
- `24/solid` - Solid icons
- `20/solid` - Smaller solid icons

### 8. react-i18next - Internationalization

**Purpose**: Multi-language support for the application.

**Features**:
- Automatic language detection
- Persistent language preference
- Fallback language support
- Pluralization support

**Usage**:
```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// Basic translation
t('nav.home')

// With variables
t('welcome.message', { name: 'John' })

// Change language
i18n.changeLanguage('ru');
```

**Supported Languages**:
- English (en)
- Russian (ru)
- Kazakh (kz)

## 🧩 Component Library

### Core Components

#### SearchAutocomplete
Fuzzy search component with autocomplete functionality.

```typescript
<SearchAutocomplete
  products={products}
  onProductSelect={handleProductSelect}
  onSearch={handleSearch}
  placeholder="Search teas..."
  className="w-full"
/>
```

#### DarkModeToggle
Toggle component for dark/light mode switching.

```typescript
<DarkModeToggle
  size="md"
  showLabel={false}
  className="ml-4"
/>
```

#### RecentlyViewed
Displays recently viewed products with animations.

```typescript
<RecentlyViewed
  onProductClick={handleProductClick}
  maxItems={4}
  showTitle={true}
/>
```

#### Wishlist
Manages and displays wishlist items.

```typescript
<Wishlist
  products={products}
  onProductClick={handleProductClick}
  maxItems={6}
  showTitle={true}
/>
```

## 🎨 Styling & Theming

### Dark Mode Support
The application includes comprehensive dark mode support:

```css
/* Light mode */
.bg-white { background-color: white; }
.text-gray-900 { color: #111827; }

/* Dark mode */
.dark .bg-white { background-color: #1f2937; }
.dark .text-gray-900 { color: #f9fafb; }
```

### Color Palette
Custom color scheme for the tea brand:

- **Sage**: `#9CA68C` - Primary brand color
- **Chai**: `#B29370` - Secondary brand color
- **Clay**: `#D9A273` - Accent color
- **Teal**: `#557D77` - Complementary color

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Nirvana Chai

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_SEARCH=true
VITE_ENABLE_WISHLIST=true
```

### Store Configuration
```typescript
// Persistent storage configuration
{
  name: "cart-storage",
  partialize: (state) => ({ items: state.items }),
}
```

## 🚀 Performance Optimizations

### Code Splitting
- Lazy loading of pages and components
- Dynamic imports for heavy libraries
- Route-based code splitting

### State Management
- Selective subscriptions to prevent unnecessary re-renders
- Optimized store updates
- Persistent storage with selective serialization

### Search Optimization
- Debounced search input
- Cached search results
- Configurable search thresholds

## 📱 Responsive Design

All components are built with mobile-first responsive design:

```css
/* Mobile first approach */
.grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

## 🔒 Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## 🧪 Testing

### Unit Testing
```typescript
import { render, screen } from '@testing-library/react';
import { useCartStore } from '../stores/useStore';

test('adds item to cart', () => {
  const { addItem, getTotalItems } = useCartStore.getState();
  addItem(mockProduct, 1);
  expect(getTotalItems()).toBe(1);
});
```

### Integration Testing
```typescript
test('search functionality', async () => {
  render(<SearchAutocomplete products={mockProducts} />);
  const input = screen.getByPlaceholderText('Search...');
  fireEvent.change(input, { target: { value: 'darjeeling' } });
  await waitFor(() => {
    expect(screen.getByText('Darjeeling First Flush')).toBeInTheDocument();
  });
});
```

## 📚 Best Practices

### State Management
1. Use Zustand for global state
2. Use Jotai for local component state
3. Keep stores focused and single-purpose
4. Implement proper TypeScript types

### Performance
1. Memoize expensive computations
2. Use React.memo for pure components
3. Implement proper cleanup in useEffect
4. Optimize bundle size with tree shaking

### User Experience
1. Provide loading states
2. Handle error states gracefully
3. Use consistent animations
4. Implement proper feedback for user actions

## 🔄 Migration Guide

### From Redux to Zustand
```typescript
// Old Redux pattern
const mapStateToProps = (state) => ({
  cartItems: state.cart.items
});

// New Zustand pattern
const cartItems = useCartStore(state => state.items);
```

### From Context to Jotai
```typescript
// Old Context pattern
const ThemeContext = createContext();

// New Jotai pattern
const themeAtom = atom('light');
const [theme, setTheme] = useAtom(themeAtom);
```

## 🆘 Troubleshooting

### Common Issues

1. **Dark mode not persisting**
   - Check localStorage permissions
   - Verify store persistence configuration

2. **Search not working**
   - Ensure Fuse.js is properly configured
   - Check product data structure

3. **Animations not smooth**
   - Verify framer-motion installation
   - Check for conflicting CSS transitions

4. **Toast notifications not showing**
   - Ensure ToastProvider is mounted
   - Check toast configuration

### Debug Mode
Enable debug mode for development:

```typescript
// Enable i18n debug
i18n.init({ debug: true });

// Enable Zustand devtools
import { devtools } from 'zustand/middleware';
const useStore = create(devtools(store));
```

## 📖 Additional Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Fuse.js Documentation](https://fusejs.io/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Headless UI Documentation](https://headlessui.com/)
- [React i18next Documentation](https://react.i18next.com/)

## 🤝 Contributing

When adding new features or modifying existing ones:

1. Follow the established patterns
2. Add proper TypeScript types
3. Include accessibility features
4. Write tests for new functionality
5. Update this documentation

---

This documentation should be updated as new features are added or existing ones are modified. 