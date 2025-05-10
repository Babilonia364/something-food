'use client';
import { useState } from "react";

export type TicketItems = {
  mainItemId: string,
  mainItemName: string,
  mainItemQuantity: number,
  mainItemPrice: string,
  observationMessage: string,
  subItems: Array<{
    id: string;
    category: string;
    items: Array<{
      id: string;
      name: string;
      price?: string;
    }>;
  }>;
};

type UseManagerTicketReturn = {
  getCurrentQuantity: () => number,
  updateCurrentQuantity: (quantity: number) => void;
};

export function useManagerTicket({ items }: { items: TicketItems }): UseManagerTicketReturn {
  const [currentItems, setCurrentItems] = useState({ ...items });

  const getCurrentQuantity = () => {
    return currentItems.mainItemQuantity;
  }

  const updateCurrentQuantity = (quantity: number) => {
    setCurrentItems({ ...currentItems, mainItemQuantity: Math.max(currentItems.mainItemQuantity + quantity, 0) });
  }

  return {
    getCurrentQuantity,
    updateCurrentQuantity
  }
}