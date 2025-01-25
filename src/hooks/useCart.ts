import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useCart = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartCount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCartItemCount(0);
        return;
      }

      const { data, error } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('user_id', user.id);

      if (error) throw error;

      const totalCount = data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      setCartItemCount(totalCount);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart count:', err);
      setError(err instanceof Error ? err.message : 'Error fetching cart count');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('No authenticated user');
      }

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItemCount(0);
      setError(null);
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError(err instanceof Error ? err.message : 'Error clearing cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchCartCount();
    });

    // Subscribe to cart changes
    const channel = supabase
      .channel('cart_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cart_items'
        },
        () => {
          fetchCartCount();
        }
      )
      .subscribe();

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    cartItemCount,
    loading,
    error,
    clearCart,
    refreshCart: fetchCartCount
  };
};