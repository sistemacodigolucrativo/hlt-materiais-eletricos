import { Product } from '@/types';
import { mockProducts as initialMockProducts } from '@/data/mock';

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem('hlt_products_v2');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored products', e);
    }
  }
  localStorage.setItem('hlt_products_v2', JSON.stringify(initialMockProducts));
  return initialMockProducts;
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('hlt_products_v2', JSON.stringify(products));
};
