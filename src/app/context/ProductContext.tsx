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

interface IProductContext {
  selectedItems: ChoosenProducts[],
  setSelectedItems: Dispatch<SetStateAction<ChoosenProducts[]>>
}

const ProductContext = createContext<IProductContext | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<ChoosenProducts[]>([]);

  return (
    <ProductContext.Provider value={{ selectedItems, setSelectedItems }}>
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
