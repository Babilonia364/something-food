'use client';
import { useProductContext } from "@/app/context/ProductContext";
import { Additional } from "@/data/types/products";
import { useEffect, useState } from "react";

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
  updateQuantity: (productId: string, itemName: string, newQuantity: number, itemPrice?: number) => void;
};

export function useControl({ items, categoryName, categoryId }: Products): UseControlReturn {
  const { selectedItems, setSelectedItems, updateProductInCategory } = useProductContext();

  const getInitialQuantity = (productId: string) => {
    const category = selectedItems?.find(cat => cat.id === categoryId);
    if (!category) return 0;

    const product = category.products.find(prod => prod.id === productId);
    return product?.quantity || 0;
  };

  const [productsTotal, setProductsTotal] = useState({
    items: items.map(item => ({
      id: item.id,
      quantity: getInitialQuantity(item.id)
    }))
  });

  useEffect(() => {
    setProductsTotal({
      items: items.map(item => ({
        id: item.id,
        quantity: getInitialQuantity(item.id)
      }))
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, selectedItems]);

  const getCurrentQuantity = (productId: string) => {
    return productsTotal.items.find(item => item.id === productId)?.quantity || 0;
  };

  const updateQuantity = (productId: string, itemName: string, newQuantity: number, itemPrice?: number) => {
    const auxSelected = selectedItems || [];
    const currentQuantity = getCurrentQuantity(productId);
    const updatedQuantity = Math.max(0, currentQuantity + newQuantity);

    updateProductInCategory(
      auxSelected,
      categoryId,
      categoryName,
      productId,
      itemName,
      updatedQuantity,
      itemPrice || 0
    );

    setProductsTotal(prev => ({
      items: prev.items.map(item =>
        item.id === productId
          ? { ...item, quantity: updatedQuantity }
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