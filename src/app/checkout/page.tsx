'use client'
import { useEffect, useState } from "react";
import { ChoosenProducts, MainProduct } from "@/data/types/context";
import { Ticket } from "../components/Ticket";
import { deleteCookie, getCookie } from "cookies-next";
import { formatBRL } from "@/lib/format";
import { TicketItems } from "../components/Ticket/hooks";
import { useRouter } from "next/navigation";
import { LogoCard } from "../components/LogoCard";
import { Button } from "../components/Button";

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const cookieData = getCookie('selectedItems');
  const selectedItems = cookieData ? JSON.parse(cookieData.toString()) : [];
  const cookieDataMain = getCookie('mainItem');
  const mainItem = cookieDataMain ? JSON.parse(cookieDataMain.toString()) : {};
  const cookieDataRestaurant = getCookie('restaurantData');
  const restaurantData = cookieDataRestaurant ? JSON.parse(cookieDataRestaurant.toString()) : {};
  const cookieDataTotal = getCookie('total');
  const totalData = cookieDataTotal ? Number(cookieDataTotal) : 0;
  const router = useRouter();


  function convertToTicketItems(
    selectedItems: ChoosenProducts[],
    mainItem: MainProduct,
    observationMessage: string = "Default item"
  ): TicketItems {
    const mainItemData = {
      mainItemId: restaurantData.name,
      mainItemName: restaurantData.name,
      mainItemQuantity: mainItem.quantity,
      mainItemPrice: formatBRL(mainItem.price),
      observationMessage: restaurantData.description || observationMessage,
    };

    const auxArray = selectedItems.map(category => ({
      id: category.id,
      category: category.category,
      items: category.products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price ? formatBRL(product.price) : undefined
      }))
    }));

    const subItems = [
      {
        id: mainItem.id,
        category: mainItem.category,
        items: [{
          id: `${mainItem.name}${mainItem.id}`,
          name: mainItem.name,
          price: undefined
        }]
      },
      ...auxArray
    ];

    return {
      ...mainItemData,
      subItems
    };
  }

  const ExitPage = () => {
    deleteCookie('selectedItems');
    deleteCookie('mainItem');
    deleteCookie('restaurantData');
    deleteCookie('total');

    router.push('/')
  }

  useEffect(() => {
    if (restaurantData.logo === undefined) router.push('/home');
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>empty state</div>
  }

  return (
    <div className="flex flex-col py-3 h-full justify-between">
      <div className="px-3">
        < LogoCard name={restaurantData.name} logo={restaurantData.logo} variant="checkout" />
      </div>
      <Ticket
        items={convertToTicketItems(selectedItems, mainItem)}
        OnClickEdit={() => { router.back() }}
      />
      <div className="flex px-10 items-end justify-between py-5 shadow-[inset_0_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-content-neutral-strong">subtotal</p>
          <p className="text-xl font-bold text-content-primary">{formatBRL(totalData)}</p>
        </div>
        <div>
          <Button buttonColor="primary" buttonType="solid" className="w-50 h-12" onClick={() => {ExitPage()}}>
            <p className="text-sm font-semibold text-content-neutral-white">ir para o pagamento</p>
          </Button>
        </div>
      </div>
    </div>
  );
}