import { useState } from 'react';
import { fetchProduct } from '../services/api';
import { CartFormData, CartItem } from '../types/cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const addToCart = async ({ productId, quantity }: CartFormData) => {
    setError('');
    setLoading(true);

    try {
      const product = await fetchProduct(productId);
      const quantityNum = parseInt(quantity);
      
      setCartItems(prev => [...prev, {
        ...product,
        quantity: quantityNum,
        totalPrice: product.price * quantityNum
      }]);
      
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error inesperado');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { cartItems, error, loading, addToCart };
};