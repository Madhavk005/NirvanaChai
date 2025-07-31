import { useState } from 'react';
import { User, Package, Heart, Settings, LogOut, Eye, EyeOff } from 'lucide-react';

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
    setRegisterData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  };

  const orders = [
    {
      id: '12345',
      date: '2025-01-10',
      status: 'Delivered',
      total: 89.97,
      items: ['Earl Grey Supreme', 'Dragon Well Green', 'Morning Serenity']
    },
    {
      id: '12344',
      date: '2025-01-05',
      status: 'In Transit',
      total: 45.99,
      items: ['Himalayan Gold']
    },
    {
      id: '12343',
      date: '2024-12-28',
      status: 'Delivered',
      total: 124.96,
      items: ['Assam Breakfast', 'Evening Bliss', 'Iron Goddess Oolong', 'Silver Needle White']
    }
  ];

  const wishlist = [
    {
      id: 1,
      name: "Dragon Well Green",
      price: 32.99,
      image: "🐉"
    },
    {
      id: 2,
      name: "Silver Needle White",
      price: 68.99,
      image: "🤍"
    },
    {
      id: 3,
      name: "Iron Goddess Oolong",
      price: 42.99,
      image: "🍃"
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-off-white to-clay-50 py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold text-sage-800 mb-2">
                Welcome to Nirvanachai
              </h1>
              <p className="text-sage-600">
                Sign in to your account or create a new one
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex mb-8 bg-sage-50 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'bg-white text-sage-800 shadow-sm'
                    : 'text-sage-600 hover:text-sage-800'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'register'
                    ? 'bg-white text-sage-800 shadow-sm'
                    : 'text-sage-600 hover:text-sage-800'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-400 hover:text-sage-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center">
                  <a href="#" className="text-sm text-sage-600 hover:text-sage-800">
                    Forgot your password?
                  </a>
                </div>
              </form>
            )}

            {/* Register Form */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <p className="text-xs text-sage-500 text-center">
                  By creating an account, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Logged in dashboard
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-heading font-bold text-sage-800">
                Welcome back, John!
              </h1>
              <p className="text-sage-600 mt-1">
                Manage your orders, preferences, and tea journey
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-sage-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sage-800">John Doe</h3>
                  <p className="text-sm text-sage-600">john@example.com</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <a href="#orders" className="flex items-center gap-3 p-3 rounded-lg bg-sage-50 text-sage-800">
                  <Package className="h-5 w-5" />
                  My Orders
                </a>
                <a href="#wishlist" className="flex items-center gap-3 p-3 rounded-lg hover:bg-sage-50 text-sage-600">
                  <Heart className="h-5 w-5" />
                  Wishlist
                </a>
                <a href="#settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-sage-50 text-sage-600">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-sage-800">3</div>
                <div className="text-sm text-sage-600">Total Orders</div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-sage-800">$260</div>
                <div className="text-sm text-sage-600">Total Spent</div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-sage-800">3</div>
                <div className="text-sm text-sage-600">Wishlist Items</div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-heading font-bold text-sage-800 mb-6">
                Recent Orders
              </h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-sage-800">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-sage-600">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-sage-800">
                          ${order.total}
                        </div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-sage-600">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}: {order.items.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-heading font-bold text-sage-800 mb-6">
                Your Wishlist
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="border border-border rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{item.image}</div>
                      <h3 className="font-semibold text-sage-800 mb-2">
                        {item.name}
                      </h3>
                      <div className="text-lg font-bold text-sage-800 mb-3">
                        ${item.price}
                      </div>
                      <button className="w-full bg-sage-600 hover:bg-sage-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
