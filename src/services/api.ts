import { Product } from '../types/cart';

export const fetchProduct = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Producto no encontrado');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error al obtener el producto');
  }
};