import api from "../api/api";
import type { Product } from "../types/Product";

export const getProducts = () => api.get<Product[]>("/products");

export const createProduct = (data: Product) =>
  api.post("/products", data);

export const updateProduct = (id: number, data: Product) =>
  api.put(`/products/${id}`, data);

export const deleteProduct = (id: number) =>
  api.delete(`/products/${id}`);

export const addMaterialToProduct = (
  productId: number,
  rawMaterialId: number,
  requiredQuantity: number
) =>
  api.post(`/products/${productId}/add-material`, {
    rawMaterialId,
    requiredQuantity,
  });