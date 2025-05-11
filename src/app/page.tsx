import { getRestaurants } from "@/lib/api/mock/restaurants";
import { Accordion } from "./components/Accordion";
import { Button } from "./components/Button";
import { Checkbox } from "./components/Checkbox";
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

  const products = [
    {
      id: "temaki",
      name: "Temaki",
      description: "Enrolado em forma de cone com alga nori e recheio variado",
      hasSomeOffProduct: true,
      variants: [
        {
          id: "temaki-salmao",
          name: "Salmão",
          price: "R$ 14,90",
          offPrice: "R$ 12,90",
          description: "Com cream cheese",
          startingPrice: true
        },
        {
          id: "temaki-atum",
          name: "Atum",
          price: "R$ 14,90",
          description: "Com cream quejo chedar",
          startingPrice: true
        },
        {
          id: "temaki-vegetariano",
          name: "Vegetariano",
          price: "R$ 10,90",
        },
      ]
    },
    {
      id: "uramaki",
      name: "Uramaki",
      description: "Enrolado com arroz por fora e recheio variado",
      hasSomeOffProduct: true,
      variants: [
        {
          id: "uramaki-salmao",
          name: "Salmão",
          price: "R$ 22,90",
          description: "10 unidades - salmão fresco com cream cheese"
        },
        {
          id: "uramaki-salmao-cebolinha",
          name: "Salmão Cebolinha",
          price: "R$ 24,90",
          description: "10 unidades - salmão com cebolinha fresca",
          startingPrice: true
        },
        {
          id: "uramaki-atum",
          name: "Atum",
          price: "R$ 21,90",
          description: "10 unidades - atum fresco com molho tarê"
        },
        {
          id: "uramaki-pele-de-salmao",
          name: "Pele de Salmão",
          price: "R$ 19,90",
          description: "10 unidades - pele de salmão grelhada com molho especial"
        },
        {
          id: "uramaki-vegetariano",
          name: "Vegetariano",
          price: "R$ 18,90",
          description: "10 unidades - pepino, manga e abacate"
        },
        {
          id: "uramaki-california",
          name: "California",
          price: "R$ 20,90",
          offPrice: "R$ 18,90",
          description: "10 unidades - kani, manga e pepino"
        }
      ]
    }
  ];

  const additionals = [
    {
      id: "additionals-shoyu",
      label: "shoyu",
      price: "R$ 4,00"
    },
    {
      id: "additionals-gengibre",
      label: "gengibre",
      price: "R$ 2,50",
      isAdditional: true,
    },
    {
      id: "additionals-wasabi",
      label: "wasabi",
    },
  ];

  const additionalsChooseOne = [
    {
      id: "additionalschoose-hashi",
      label: "hashi",
    },
    {
      id: "additionalschoose-garfo-e-faca",
      label: "garfo e faca",
      price: "R$ 1,00"
    },
    {
      id: "additionalschoose-colher",
      label: "colher",
      price: "R$ 0,75",
      isAdditional: true,
    },
    {
      id: "additionalschoose-talher",
      label: "talher",
      price: "R$ 1,25",
      isAdditional: true,
      offPrice: "R$ 1,00",
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
        <LogoCard name={open[0].name} logo={open[0].logo} />
        <LogoCard name={closed[0].name} logo={closed[0].logo} variant="checkout" />
        <Button buttonType="ghost" buttonColor="success">Criança</Button>
        <Accordion
          items={products}
          collapsible
        />
        <Checkbox items={additionals} />
        <RadioGroup items={additionalsChooseOne} />
        <ItemControl items={additionalsChooseMTO} />
        <Ticket items={ticketItems} />
      </div>
    </>
  );
}
