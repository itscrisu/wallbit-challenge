import { useEffect, useState } from 'react';
import { fetchProduct } from '../services/api';
import { CartFormData, CartItem } from '../types/cart';

const CART_STORAGE_KEY = 'cart-storage';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async ({ productId, quantity }: CartFormData) => {
    setError('');
    setLoading(true);

    try {
      const product = await fetchProduct(productId);
      const quantityNum = parseInt(quantity);
      
      setCartItems(prev => {
        const existingItemIndex = prev.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
          return prev.map((item, index) => {
            if (index === existingItemIndex) {
              const newQuantity = item.quantity + quantityNum;
              return {
                ...item,
                quantity: newQuantity,
                totalPrice: item.price * newQuantity
              };
            }
            return item;
          });
        }

        return [...prev, {
          ...product,
          quantity: quantityNum,
          totalPrice: product.price * quantityNum
        }];
      });
      
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

  const clearCart = () => {
    setCartItems([]);
  };

  const removeItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(prev => prev.map(item => 
      item.id === productId
        ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity }
        : item
    ));
  };

  return { 
    cartItems, 
    error, 
    loading, 
    addToCart,
    clearCart,
    removeItem,
    updateQuantity
  };
};