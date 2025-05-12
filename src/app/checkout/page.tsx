'use client'
import { useEffect, useState } from "react";
import { ChoosenProducts, MainProduct } from "@/data/types/context";
import { Ticket } from "../components/Ticket";
import { getCookie } from "cookies-next";
import { formatBRL } from "@/lib/format";
import { TicketItems } from "../components/Ticket/hooks";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const cookieData = getCookie('selectedItems');
  const selectedItems = cookieData ? JSON.parse(cookieData.toString()) : [];
  const cookieDataMain = getCookie('mainItem');
  const mainItem = cookieDataMain ? JSON.parse(cookieDataMain.toString()) : {};
  const router = useRouter();

  // const [total, setTotal] = useState<number>(() => {
  //   const cookieData = getCookie('total');
  //   return cookieData ? Number(cookieData) : 0;
  // });

  function convertToTicketItems(
    selectedItems: ChoosenProducts[],
    mainItem: MainProduct,
    observationMessage: string = "Default item"
  ): TicketItems {
    const mainItemData = {
      mainItemId: mainItem.id,
      mainItemName: mainItem.name,
      mainItemQuantity: mainItem.quantity,
      mainItemPrice: formatBRL(mainItem.price),
      observationMessage
    };

    const subItems = selectedItems.map(category => ({
      id: category.id,
      category: category.category,
      items: category.products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price ? formatBRL(product.price) : undefined
      }))
    }));

    return {
      ...mainItemData,
      subItems
    };
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>empty state</div>
  }

  return (
    <div>
      <Ticket
        items={convertToTicketItems(selectedItems, mainItem)}
        OnClickEdit={() => {router.push('/')}}
      />
    </div>
  );
}