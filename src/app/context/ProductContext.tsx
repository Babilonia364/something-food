/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { setCookie, getCookie } from 'cookies-next';
import { ChoosenProducts, MainProduct, RestaurantData } from "@/data/types/context";

interface IProductContext {
  selectedItems: ChoosenProducts[],
  setSelectedItems: Dispatch<SetStateAction<ChoosenProducts[]>>,
  mainItem: MainProduct,
  setMainItem: Dispatch<SetStateAction<MainProduct>>,
  total: number,
  setRestaurantData: Dispatch<SetStateAction<RestaurantData>>,
  addProductToCategory: any,
  removeProductFromCategory: any,
  updateProductInCategory: any,
  replaceFirstProduct: any
}

const ProductContext = createContext<IProductContext | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<ChoosenProducts[]>(() => {
    const cookieData = getCookie('selectedItems');
    return cookieData ? JSON.parse(cookieData.toString()) : [];
  });

  const [mainItem, setMainItem] = useState<MainProduct>(() => {
    const cookieData = getCookie('mainItem');
    return cookieData ? JSON.parse(cookieData.toString()) : {} as MainProduct;
  });

  const [restaurantData, setRestaurantData] = useState<RestaurantData>(() => {
    const cookieData = getCookie('restaurantData');
    return cookieData ? JSON.parse(cookieData.toString()) : {} as RestaurantData;
  });

  const [total, setTotal] = useState<number>(() => {
    const cookieData = getCookie('total');
    return cookieData ? Number(cookieData) : 0;
  });
  const addProductToCategory = (
    auxSelected: {
      id: string;
      category: string;
      products: { id: string; name: string; quantity: number, price: number }[];
    }[],
    categoryId: string,
    categoryName: string,
    itemId: string,
    itemName: string,
    itemPrice: number
  ) => {
    const existingCategory = auxSelected.find(cat => cat.id === categoryId);

    if (existingCategory) {
      const existingProduct = existingCategory.products.find(prod => prod.id === itemId);

      if (!existingProduct) {
        existingCategory.products.push({
          id: itemId,
          name: itemName,
          quantity: 1,
          price: itemPrice
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
            quantity: 1,
            price: itemPrice
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
      products: { id: string; name: string; quantity: number, price: number }[];
    }[],
    categoryId: string,
    categoryName: string,
    itemId: string,
    itemName: string,
    newQuantity: number,
    itemPrice: number
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
          price: itemPrice
        };
      } else {
        auxSelected[existingCategoryIndex].products.push({
          id: itemId,
          name: itemName,
          quantity: newQuantity,
          price: itemPrice
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
            price: itemPrice
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
    newProduct: { id: string; name: string; quantity: number, price: number, offPrice: number }
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

  const updateCookies = (items: ChoosenProducts[], main: MainProduct, ttl: number, restaurant: RestaurantData) => {
    setCookie('selectedItems', JSON.stringify(items), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });
    setCookie('mainItem', JSON.stringify(main), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    setCookie('total', ttl.toString(), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    setCookie('restaurantData', JSON.stringify(restaurant), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  };

  useEffect(() => {
    const updateTotal = () => {
      let total = 0;

      if (!isNaN(mainItem.price)) total += (mainItem.quantity * mainItem.price);
      selectedItems.forEach((product) => {
        product.products.forEach((item) => {
          if (!isNaN(item.price)) total += (item.quantity * item.price);
        });
      });

      setTotal(total);
    }

    updateTotal();
  }, [selectedItems, mainItem]);

  useEffect(() => {
    updateCookies(selectedItems, mainItem, total, restaurantData);
  }, [selectedItems, mainItem, total, restaurantData]);

  return (
    <ProductContext.Provider value={{
      selectedItems,
      setSelectedItems,
      mainItem,
      setMainItem,
      total,
      setRestaurantData,
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
