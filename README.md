# Nirvana Chai - Premium Tea E-commerce Platform

A modern, high-performance e-commerce platform for premium tea products, built with React, TypeScript, and Node.js.

## 🚀 Features

### Frontend

- **Modern React Architecture** - Built with React 18, TypeScript, and Vite
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Performance Optimized** - Lazy loading, code splitting, and React Query caching
- **Internationalization** - Multi-language support with i18next
- **State Management** - Zustand for lightweight, performant state management
- **Error Handling** - Comprehensive error boundaries and fallback UI
- **Accessibility** - WCAG compliant components and navigation

### Backend

- **RESTful API** - Express.js with proper error handling and validation
- **Security** - Helmet.js, CORS, rate limiting, and input validation
- **Performance** - Efficient data filtering, pagination, and caching
- **Scalable Architecture** - Modular structure with controllers and routes
- **Health Monitoring** - Built-in health checks and logging

### E-commerce Features

- **Product Catalog** - Advanced filtering, search, and sorting
- **Shopping Cart** - Persistent cart with real-time updates
- **Wishlist** - Save favorite products for later
- **Multi-currency** - Dynamic currency conversion
- **Location Detection** - Automatic shipping and pricing based on location
- **Responsive Checkout** - Streamlined purchase process

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Zustand** - State management
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime
- **Express.js** - Web framework
- **Helmet.js** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/nirvana-chai.git
   cd nirvana-chai
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd nirvana-chai-backend
   npm install
   cd ..
   ```

3. **Set up environment variables**

   ```bash
   # Frontend (.env.local)
   cp client/.env.example client/.env.local

   # Backend (.env)
   cp nirvana-chai-backend/.env.example nirvana-chai-backend/.env
   ```

4. **Start development servers**

   ```bash
   # Start backend server (in one terminal)
   cd nirvana-chai-backend
   npm run dev

   # Start frontend server (in another terminal)
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 🏗️ Project Structure

```
nirvana-chai/
├── client/                 # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── stores/            # Zustand stores
│   ├── contexts/          # React contexts
│   ├── utils/             # Utility functions
│   └── i18n/              # Internationalization
├── nirvana-chai-backend/  # Backend Node.js API
│   ├── controllers/       # Request handlers
│   ├── routes/            # API routes
│   ├── data/              # Static data
│   └── middleware/        # Custom middleware
├── server/                # Additional server files
└── shared/                # Shared utilities
```

## 🚀 Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # Run TypeScript checks
npm run format.fix   # Format code with Prettier
```

### Backend

```bash
cd nirvana-chai-backend
npm run dev          # Start development server with nodemon
npm start            # Start production server
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:5001/api
VITE_APP_NAME=Nirvana Chai
VITE_ENABLE_ANALYTICS=false
```

#### Backend (.env)

```env
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key
```

## 📱 API Endpoints

### Products

- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/categories` - Get product categories
- `GET /api/products/origins` - Get product origins

### Health

- `GET /api/health` - Health check endpoint

## 🎨 Customization

### Styling

The project uses Tailwind CSS for styling. Custom styles can be added in:

- `client/global.css` - Global styles
- `tailwind.config.ts` - Tailwind configuration

### Components

Components are built with Radix UI primitives and styled with Tailwind CSS. New components should follow the existing patterns in `client/components/`.

### Data

Product data is stored in `nirvana-chai-backend/data/products.js`. The structure can be extended to include additional fields.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Railway/Heroku)

```bash
cd nirvana-chai-backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/nirvana-chai/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [Express.js](https://expressjs.com/) - Web framework
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

**Nirvana Chai** - Where tradition meets innovation in every cup. ☕
