'use client';
import { useState } from "react";

export type TicketItems = {
  mainItemId: string,
  mainItemName: string,
  mainItemQuantity: number,
  mainItemPrice: string,
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

export function useManagerTicket() {
  const [mainQuantity, setMainQuantity] = useState();

  return {}
}