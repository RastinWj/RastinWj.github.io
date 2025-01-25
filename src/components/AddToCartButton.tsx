import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../hooks/useCart';

interface AddToCartButtonProps {
  productId: string;
  isPersian: boolean;
  onSuccess?: () => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  isPersian,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartItemId, setCartItemId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { refreshCart } = useCart();

  // Fetch initial quantity on mount
  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const { data, error } = await supabase
          .from('cart_items')
          .select('id, quantity')
          .eq('product_id', productId)
          .limit(1);

        if (error) throw error;
        if (data && data.length > 0) {
          setQuantity(data[0].quantity);
          setCartItemId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching cart item:', error);
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchCartItem();
    });

    // Subscribe to cart changes for this product
    const channel = supabase
      .channel(`cart_${productId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cart_items',
          filter: `product_id=eq.${productId}`
        },
        () => {
          fetchCartItem();
        }
      )
      .subscribe();

    fetchCartItem();

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [productId]);

  const addToCart = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please log in to add items to cart');

      const { error } = await supabase
        .from('cart_items')
        .insert([
          {
            product_id: productId,
            quantity: 1,
            user_id: user.id
          }
        ]);

      if (error) throw error;
      
      // Fetch the newly created cart item
      const { data: newItem, error: fetchError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('product_id', productId)
        .eq('user_id', user.id)
        .limit(1);

      if (fetchError) throw fetchError;
      
      if (newItem && newItem.length > 0) {
        setCartItemId(newItem[0].id);
        setQuantity(1);
        await refreshCart(); // Refresh the cart count
        if (onSuccess) onSuccess();

        // Trigger animation
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(isPersian ? 'خطا در افزودن به سبد خرید' : 'Error adding to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 0 || loading || !cartItemId) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please log in to update cart');

      if (newQuantity === 0) {
        // Remove item from cart
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', cartItemId)
          .eq('user_id', user.id);

        if (error) throw error;
        setCartItemId(null);
        setQuantity(0);
      } else {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('id', cartItemId)
          .eq('user_id', user.id);

        if (error) throw error;
        setQuantity(newQuantity);
      }

      await refreshCart(); // Refresh the cart count
      if (onSuccess) onSuccess();

      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    } catch (error) {
      console.error('Error updating cart:', error);
      alert(isPersian ? 'خطا در بروزرسانی سبد خرید' : 'Error updating cart');
    } finally {
      setLoading(false);
    }
  };

  if (quantity > 0) {
    return (
      <div 
        className={`flex items-center justify-between bg-blue-900 rounded-full overflow-hidden transition-all duration-300 ${
          isAnimating ? 'scale-105' : ''
        }`}
      >
        <button
          onClick={() => updateQuantity(quantity - 1)}
          disabled={loading}
          className="p-3 text-blue-400 hover:text-white hover:bg-blue-800 transition-colors disabled:opacity-50"
          aria-label={isPersian ? 'کاهش تعداد' : 'Decrease quantity'}
        >
          <Minus className="w-5 h-5" />
        </button>
        
        <span className="text-white font-semibold min-w-[3rem] text-center">
          {quantity}
        </span>
        
        <button
          onClick={() => updateQuantity(quantity + 1)}
          disabled={loading}
          className="p-3 text-blue-400 hover:text-white hover:bg-blue-800 transition-colors disabled:opacity-50"
          aria-label={isPersian ? 'افزایش تعداد' : 'Increase quantity'}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={addToCart}
      disabled={loading}
      className={`glow-button w-full flex items-center justify-center gap-2 transition-all duration-300 ${
        isAnimating ? 'scale-105' : ''
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      <span>
        {loading
          ? (isPersian ? 'در حال افزودن...' : 'Adding...')
          : (isPersian ? 'افزودن به سبد خرید' : 'Add to Cart')}
      </span>
    </button>
  );
};