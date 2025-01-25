import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/product';
import { Build } from '../types/build';
import { products } from '../data/products';
import { builds } from '../data/builds';
import { useCart } from '../hooks/useCart';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  date_added: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPersian: boolean;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, isPersian }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { refreshCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  const fetchCartItems = async () => {
    try {
      const { data: items, error } = await supabase
        .from('cart_items')
        .select('*')
        .order('date_added', { ascending: false });

      if (error) throw error;
      setCartItems(items || []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getItemDetails = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      return {
        name: isPersian ? product.name.fa : product.name.en,
        price: product.price,
        image: product.image
      };
    }
    
    const build = builds.find(b => b.id === productId);
    if (build) {
      return {
        name: isPersian ? build.name.fa : build.name.en,
        price: build.price,
        image: build.image
      };
    }
    
    return null;
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;
      await fetchCartItems();
      await refreshCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId: string) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await fetchCartItems();
      await refreshCart();
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const details = getItemDetails(item.product_id);
      return total + (details?.price || 0) * item.quantity;
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">
              {isPersian ? 'سبد خرید' : 'Shopping Cart'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="text-center text-gray-400">
              {isPersian ? 'در حال بارگذاری...' : 'Loading...'}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center text-gray-400">
              {isPersian ? 'سبد خرید خالی است' : 'Your cart is empty'}
            </div>
          ) : (
            cartItems.map(item => {
              const details = getItemDetails(item.product_id);
              if (!details) return null;

              return (
                <div
                  key={item.id}
                  className="flex gap-4 bg-gray-700/50 p-4 rounded-lg"
                >
                  <img
                    src={details.image}
                    alt={details.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{details.name}</h3>
                    <p className="text-blue-400">${details.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updating}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updating}
                        className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={updating}
                        className="ml-auto p-1 text-red-400 hover:text-red-300 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-700 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">
                {isPersian ? 'مجموع' : 'Total'}:
              </span>
              <span className="text-blue-400 text-xl font-bold">
                ${calculateTotal().toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => {
                // TODO: Implement checkout
                alert(isPersian ? 'به زودی!' : 'Coming soon!');
              }}
              disabled={updating}
              className="glow-button w-full"
            >
              {isPersian ? 'تکمیل خرید' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};