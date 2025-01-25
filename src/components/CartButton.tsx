import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  onClick: () => void;
  itemCount: number;
  isPersian: boolean;
  loading?: boolean;
}

export const CartButton: React.FC<CartButtonProps> = ({
  onClick,
  isPersian,
  loading = false
}) => {
  return (
    <button
      onClick={onClick}
      className="relative glow-button !p-3 disabled:opacity-50"
      disabled={loading}
      aria-label={isPersian ? 'مشاهده سبد خرید' : 'View Cart'}
    >
      <ShoppingCart className={`w-6 h-6 ${loading ? 'animate-pulse' : ''}`} />
    </button>
  );
};