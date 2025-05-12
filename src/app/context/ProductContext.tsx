/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ChoosenProduct = {
  id: string,
  name: string,
  quantity: number
}

type ChoosenProducts = {
  id: string,
  category: string,
  products: ChoosenProduct[]
}

type MainProduct = {
  id: string,
  category: string,
  name: string,
  quantity: number
}

interface IProductContext {
  selectedItems: ChoosenProducts[],
  setSelectedItems: Dispatch<SetStateAction<ChoosenProducts[]>>,
  mainItem: MainProduct,
  setMainItem: Dispatch<SetStateAction<MainProduct>>,
  addProductToCategory: any,
  removeProductFromCategory: any,
  updateProductInCategory: any,
  replaceFirstProduct: any,
}

const ProductContext = createContext<IProductContext | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<ChoosenProducts[]>([]);
  const [mainItem, setMainItem] = useState<MainProduct>({} as MainProduct);
  const addProductToCategory = (
    auxSelected: {
      id: string;
      category: string;
      products: { id: string; name: string; quantity: number }[];
    }[],
    categoryId: string,
    categoryName: string,
    itemId: string,
    itemName: string
  ) => {
    const existingCategory = auxSelected.find(cat => cat.id === categoryId);

    if (existingCategory) {
      const existingProduct = existingCategory.products.find(prod => prod.id === itemId);

      if (!existingProduct) {
        existingCategory.products.push({
          id: itemId,
          name: itemName,
          quantity: 1
        });
      }
    } else {
      auxSelected.push({
        id: categoryId,
        category: categoryName,
        products: [
          {
            id: itemId,
            name: itemName,
            quantity: 1
          }
        ]
      });
    }
  }

  const removeProductFromCategory = (
    auxSelected: {
      id: string;
      category: string;
      products: { id: string; name: string; quantity: number }[];
    }[],
    categoryId: string,
    itemId: string
  ) => {
    const categoryIndex = auxSelected.findIndex(cat => cat.id === categoryId);

    if (categoryIndex === -1) {
      return;
    }

    const updatedProducts = auxSelected[categoryIndex].products.filter(
      prod => prod.id !== itemId
    );

    if (updatedProducts.length === 0) {
      auxSelected.splice(categoryIndex, 1);
    } else {
      auxSelected[categoryIndex] = {
        ...auxSelected[categoryIndex],
        products: updatedProducts
      };
    }
  };

  const updateProductInCategory = (
    auxSelected: {
      id: string;
      category: string;
      products: { id: string; name: string; quantity: number }[];
    }[],
    categoryId: string,
    categoryName: string,
    itemId: string,
    itemName: string,
    newQuantity: number,
  ) => {
    const existingCategoryIndex = auxSelected.findIndex(cat => cat.id === categoryId);

    if (existingCategoryIndex !== -1) {
      const existingProductIndex = auxSelected[existingCategoryIndex].products.findIndex(
        prod => prod.id === itemId
      );

      if (existingProductIndex !== -1) {
        auxSelected[existingCategoryIndex].products[existingProductIndex] = {
          id: itemId,
          name: itemName,
          quantity: newQuantity,
        };
      } else {
        auxSelected[existingCategoryIndex].products.push({
          id: itemId,
          name: itemName,
          quantity: newQuantity,
        });
      }
    } else {
      auxSelected.push({
        id: categoryId,
        category: categoryName,
        products: [
          {
            id: itemId,
            name: itemName,
            quantity: newQuantity,
          },
        ],
      });
    }
  };

  const replaceFirstProduct = (
    auxSelected: {
      id: string;
      category: string;
      products: { id: string; name: string; quantity: number }[];
    }[],
    categoryId: string,
    categoryName: string,
    newProduct: { id: string; name: string; quantity: number }
  ) => {
    const categoryIndex = auxSelected.findIndex(cat => cat.id === categoryId);

    if (categoryIndex !== -1) {
      const updatedProducts = [...auxSelected[categoryIndex].products];

      if (updatedProducts.length > 0) {
        updatedProducts[0] = newProduct;
      } else {
        updatedProducts.push(newProduct);
      }

      auxSelected[categoryIndex] = {
        ...auxSelected[categoryIndex],
        products: updatedProducts
      };
    } else {
      auxSelected.push({
        id: categoryId,
        category: categoryName,
        products: [newProduct]
      });
    }
  }

  return (
    <ProductContext.Provider value={{
      selectedItems,
      setSelectedItems,
      mainItem,
      setMainItem,
      addProductToCategory,
      removeProductFromCategory,
      updateProductInCategory,
      replaceFirstProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
