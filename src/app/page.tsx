import { Accordion } from "./components/Accordion";
import { Button } from "./components/Button";
import { Checkbox } from "./components/Checkbox";
import { ItemControl } from "./components/ItemControl";
import { RadioGroup } from "./components/RadioGroup";
import { Ticket } from "./components/Ticket";

export default function Home() {
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
    <div className="bg-surface-background">
      <h1 className="text-content-neutral-base text-xs">Texto</h1>
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
  );
}
