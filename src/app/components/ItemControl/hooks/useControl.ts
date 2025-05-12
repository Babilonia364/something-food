'use client';
import { useProductContext } from "@/app/context/ProductContext";
import { Additional } from "@/data/types/products";
import { useState } from "react";

export type Products = {
  items: Additional[];
  categoryName: string;
  categoryId: string;
}

type ProductQuantity = {
  id: string;
  quantity: number;
};

type UseControlReturn = {
  productsTotal: { items: ProductQuantity[] };
  getCurrentQuantity: (productId: string) => number;
  updateQuantity: (productId: string, itemName: string, newQuantity: number) => void;
};

export function useControl({ items, categoryName, categoryId }: Products): UseControlReturn {
  const initialState = {
    items: items.map(item => ({
      id: item.id,
      quantity: 0
    }))
  };
  const { selectedItems, setSelectedItems, updateProductInCategory } = useProductContext();

  const [productsTotal, setProductsTotal] = useState(initialState);

  const getCurrentQuantity = (productId: string) => {
    return productsTotal.items.find(item => item.id === productId)?.quantity || 0;
  };

  const updateQuantity = (productId: string, itemName: string, newQuantity: number) => {
    const auxSelected = selectedItems || [];

    updateProductInCategory(auxSelected, categoryId, categoryName, productId, itemName, getCurrentQuantity(productId) + newQuantity);

    setProductsTotal(prev => ({
      items: prev.items.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + newQuantity) }
          : item
      )
    }));
    setSelectedItems([...auxSelected]);
  }

  return {
    getCurrentQuantity,
    productsTotal,
    updateQuantity
  }
}