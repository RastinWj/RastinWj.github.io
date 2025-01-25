import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cpu, MonitorSmartphone, MemoryStick as Memory, HardDrive } from 'lucide-react';
import { products } from '../data/products';
import { AddToCartButton } from '../components/AddToCartButton';

interface ProductDetailProps {
  isPersian?: boolean;
  user?: any;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ isPersian = false, user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            {isPersian ? 'محصول پیدا نشد' : 'Product Not Found'}
          </h1>
          <button
            onClick={() => navigate('/products')}
            className="glow-button"
          >
            {isPersian ? 'بازگشت به محصولات' : 'Back to Products'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate('/products')}
          className="glow-button"
        >
          {isPersian ? 'بازگشت' : 'Back'}
        </button>
      </div>

      <div className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <img
                  src={product.image}
                  alt={isPersian ? product.name.fa : product.name.en}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {isPersian ? product.name.fa : product.name.en}
                </h1>
                <p className="text-2xl text-blue-400">${product.price.toLocaleString()}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  {isPersian ? 'توضیحات' : 'Description'}
                </h2>
                <p className="text-gray-300">
                  {isPersian ? product.shortDescription.fa : product.shortDescription.en}
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  {isPersian ? 'مشخصات' : 'Specifications'}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{product.specs.processor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MonitorSmartphone className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{product.specs.gpu}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Memory className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{product.specs.ram}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HardDrive className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">{product.specs.storage}</span>
                  </div>
                </div>
              </div>

              {user ? (
                <AddToCartButton
                  productId={product.id}
                  isPersian={isPersian}
                />
              ) : (
                <button
                  onClick={() => navigate('/?login=true')}
                  className="glow-button w-full"
                >
                  {isPersian ? 'ورود برای خرید' : 'Login to Purchase'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};