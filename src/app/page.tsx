import { getRestaurants } from "@/lib/api/mock/restaurants";
import { Button } from "./components/Button";
import { ClientCard } from "./components/ClientCard";
import { ItemControl } from "./components/ItemControl";
import { RadioGroup } from "./components/RadioGroup";
import { Ticket } from "./components/Ticket";
import { Client } from "@/data/types/restaurants";
import { isRestaurantOpen } from "@/lib/utils/time";
import { tv } from "tailwind-variants";
import Image from "next/image";
import bannerImage from "@/app/assets/banner.jpg";
import { LogoCard } from "./components/LogoCard";

const home = tv({
  slots: {
    title: "text-xl font-bold text-content-primary",
    banner: "",
  },
  variants: {
    variant: {
      enabled: {
        title: '',
      },
      disabled: {
        title: 'pt-2',
      },
    }
  }
});

export default async function Home() {
  const restaurantsList: Client[] = await getRestaurants();
  const open: Client[] = [];
  const closed: Client[] = [];
  const { title, banner } = home();

  if (restaurantsList.length <= 0) return <div>Empty state</div>;

  restaurantsList.forEach((restaurant) => {
    if (isRestaurantOpen(restaurant.openingHours)) {
      open.push(restaurant)
    } else {
      closed.push(restaurant)
    }
  });

  const additionalsChooseOne = [
    {
      id: "additionalschoose-hashi",
      label: "hashi",
    },
    {
      id: "additionalschoose-garfo-e-faca",
      label: "garfo e faca",
      price: 1.00
    },
    {
      id: "additionalschoose-colher",
      label: "colher",
      price: 0.75,
      isAdditional: true,
    },
    {
      id: "additionalschoose-talher",
      label: "talher",
      price: 1.25,
      isAdditional: true,
      offPrice: 1.00,
    },
  ];

  const additionalsChooseMTO = [
    {
      id: "additionalschoosemto-coca-cola",
      label: "coca-cola",
      price: "R$ 5,00"
    },
    {
      id: "additionalschoosemto-água",
      label: "água",
      price: "R$ 4,00"
    },
    {
      id: "additionalschoosemto-fanta-laranja",
      label: "fanta laranja",
      price: "R$ 5,00"
    }
  ];

  const ticketItems = {
    mainItemId: "ticket-item-ceviche",
    mainItemName: "Ceviche de salmão",
    mainItemQuantity: 1,
    mainItemPrice: "R$ 19,90",
    observationMessage: "tirar a cebolinha",
    subItems: [
      {
        id: "subitem-tamanho",
        category: "tamanho",
        items: [
          {
            id: "subitem-item-medio",
            name: "medio",
          }
        ]
      },
      {
        id: "subitem-vai-querer-bebida",
        category: "vai querer bebida?",
        items: [
          {
            id: "subitem-item-coca-cola",
            name: "coca-cola",
            price: "R$5,00",
          }
        ]
      }
    ]
  };

  return (
    <>
      <Image
        src={bannerImage}
        alt="announcement for children's day where a man and a woman, dressed in super hero costumes showcase a 50% off in some purchases"
        className={banner()}
      />
      <div className="flex flex-col bg-surface-background px-4 py-6 gap-4">
        <h3 className={title({ variant: "enabled" })}>abertos</h3>
        <ClientCard items={open} />
        <h3 className={title({ variant: "disabled" })}>fechados</h3>
        <ClientCard items={closed} variant="disabled" />
        <LogoCard name={closed[0].name} logo={closed[0].logo} variant="checkout" />
        <Button buttonType="ghost" buttonColor="success">Criança</Button>
        <RadioGroup items={additionalsChooseOne} />
        <ItemControl items={additionalsChooseMTO} />
        <Ticket items={ticketItems} />
      </div>
    </>
  );
}
