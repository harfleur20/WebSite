import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Star, Download, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'templates' | 'resources' | 'merchandise';
  rating: number;
  downloads?: number;
}

const Shop = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const products: Product[] = [
    {
      id: '1',
      title: 'Professional Logo Template Pack',
      description: 'A collection of 50 modern and versatile logo templates',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1626785774625-8a0b6e5db499?auto=format&fit=crop&q=80',
      category: 'templates',
      rating: 4.8,
      downloads: 1250
    },
    {
      id: '2',
      title: 'Design Competition T-Shirt',
      description: 'Limited edition graphic design competition merchandise',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80',
      category: 'merchandise',
      rating: 4.9
    },
    {
      id: '3',
      title: 'Premium Icon Collection',
      description: 'Over 1000 customizable vector icons',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
      category: 'resources',
      rating: 4.7,
      downloads: 3400
    }
  ];

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'templates', label: 'Templates' },
    { id: 'resources', label: 'Resources' },
    { id: 'merchandise', label: 'Merchandise' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePurchase = async (product: Product) => {
    if (!isAuthenticated) {
      // Redirect to login
      return;
    }

    try {
      // Initialize CinetPay payment
      const paymentData = {
        amount: product.price,
        currency: 'XOF',
        description: `Purchase: ${product.title}`,
        return_url: window.location.href,
      };
      console.log('Processing payment:', paymentData);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-calvera text-5xl mb-6">Design Shop</h1>
            <p className="text-xl text-secondary-light max-w-2xl mx-auto">
              Discover premium design resources, templates, and exclusive merchandise
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category.id
                    ? 'bg-primary-light text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-primary-light/10 text-primary-light rounded-full text-sm font-medium capitalize">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>

                <h2 className="font-calvera text-xl text-primary mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-5 w-5 text-primary-light" />
                    <span className="text-lg font-semibold">{product.price} FCFA</span>
                  </div>
                  {product.downloads && (
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Download className="h-4 w-4" />
                      <span>{product.downloads}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handlePurchase(product)}
                  className="mt-4 w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Purchase Now</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;