import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { productCategories } from '../data/categories';
import { ScrollAnimation } from '../components/ScrollAnimation';

interface ProductsProps {
  isPersian?: boolean;
}

export const Products: React.FC<ProductsProps> = ({ isPersian = false }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter(product => 
        product.category.en.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate("/")}
          className="glow-button"
        >
          {isPersian ? 'بازگشت' : 'Back'}
        </button>
      </div>

      <div className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold text-white mb-12 text-center">
            {isPersian ? 'محصولات ما' : 'Our Products'}
          </h1>
          
          {/* Categories */}
          <ScrollAnimation animation="slide-in-left">
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  !selectedCategory
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {isPersian ? 'همه' : 'All'}
              </button>
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name.en)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.name.en
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {isPersian ? category.name.fa : category.name.en}
                </button>
              ))}
            </div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-12">
                {isPersian
                  ? 'هیچ محصولی در این دسته‌بندی یافت نشد'
                  : 'No products found in this category'}
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative group">
                    <img 
                      src={product.image} 
                      alt={isPersian ? product.name.fa : product.name.en}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-white">
                        {isPersian ? product.name.fa : product.name.en}
                      </h2>
                      <span className="text-xl font-semibold text-blue-400">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="learn-more-btn w-full"
                    >
                      <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                      </span>
                      <span className="button-text">
                        {isPersian ? 'مشاهده جزئیات' : 'View Details'}
                      </span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};