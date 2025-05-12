'use client';
import { Additional } from "@/data/types/products";
import { useState } from "react";

export type Products = {
  items: Additional[];
}

type ProductQuantity = {
  id: string;
  quantity: number;
};

type UseControlReturn = {
  productsTotal: { items: ProductQuantity[] };
  getCurrentQuantity: (productId: string) => number;
  updateQuantity: (productId: string, newQuantity: number) => void;
};

export function useControl({items}: Products): UseControlReturn {
  const initialState = {
    items: items.map(item => ({
      id: item.id,
      quantity: 0
    }))
  };

  const [productsTotal, setProductsTotal] = useState(initialState);

  const getCurrentQuantity = (productId: string) => {
    return productsTotal.items.find(item => item.id === productId)?.quantity || 0;
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setProductsTotal(prev => ({
      items: prev.items.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + newQuantity) }
          : item
      )
    }));
  }

  return {
    getCurrentQuantity,
    productsTotal,
    updateQuantity
  }
}