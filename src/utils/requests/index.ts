import { IProducts } from '@/app/api/models/Products';
import instance from '../axios';

export interface Category {
  _id: string;
  name: string;
  imageURL: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const res = await instance.get('api/categories');
  return res.data;
};

export const getProductsCategories = async (
  categoryId: string | null
): Promise<IProducts[]> => {
  const res = await instance.get(`api/categories/${categoryId}`);
  return res.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await instance.delete(`/api/products/${productId}`);
  return response.data;
};

export const deleteCategory = async (categoryId: string) => {
  const response = await instance.delete(`/api/game/${categoryId}`);
  return response.data;
};

export const getConfig = async () => {
  const res = await instance.get('api/game');
  return res.data;
};

export const getSpecificConfig = async (categoryId: string) => {
  const res = await instance.get(`api/game/${categoryId}`);
  return res.data;
};

export interface RedemptionItem {
  _id: string;
  code: string;
  productName: string;
  productImageURL: string;
  productId?: string;
  redeemed: boolean;
  redeemedAt?: string;
  createdAt: string;
  expired: boolean;
  expiresAt: string;
  status: 'pendiente' | 'canjeado' | 'expirado';
  timeRemainingMs: number;
}

export const getRedemptions = async (): Promise<RedemptionItem[]> => {
  const res = await instance.get('/api/redemption');
  return res.data;
};

export const validateRedemptionCode = async (code: string): Promise<RedemptionItem> => {
  const res = await instance.get(`/api/redemption/${code}`);
  return res.data;
};
