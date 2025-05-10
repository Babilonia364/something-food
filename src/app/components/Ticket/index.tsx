'use client';
import Image from "next/image";
import { shared } from "@/app/styles/shared-styles";
import { tv } from "tailwind-variants";
import pencil from "@/app/assets/pencil.svg";
import trash from "@/app/assets/trash.svg";
import { Button } from "../Button";
import { TicketItems, useManagerTicket } from "./hooks";

const ticket = tv({
  slots: {
    container: [
      'flex flex-col',
      'border-b-4 border-content-neutral-border',
      'py-4'
    ],
    item: 'flex justify-between',
    itemName: 'font-bold text-sm text-content-neutral-strong',
    itemPrice: shared().price(),
    quantity: 'flex justify-end items-center gap-2',
    icon: 'w-[10.5px] h-auto',
    iconTrash: 'h-auto w-[16px]',
    button: shared().button(),
    sign: shared().sign(),
    itemQuantity: 'font-bold text-sm text-content-neutral-base',
    category: 'flex flex-col',
    categoryText: 'text-content-neutral-weak text-sm',
    subItemContainer: 'flex justify-between',
    subItemPrice: [
      'font-bold text-sm text-content-secondary-base',
      "before:content-['•']"
    ],
  },
  variants: {
    variant: {
      enabled: {
        button: shared().button({ variant: "enabled" })
      },
      disabled: {
        button: shared().button({ variant: "disabled" })
      },
      title: {
        categoryText: [
          'font-bold',
          "before:content-['•']"
        ]
      },
      text: {
        categoryText: [
          'font-semibold',
          'pl-2.5'
        ]
      },
    }
  }
});

export const Ticket = ({ items }: { items: TicketItems }) => {
  const {
    container,
    item,
    itemName,
    itemPrice,
    quantity,
    icon,
    iconTrash,
    button,
    sign,
    itemQuantity,
    category,
    categoryText,
    subItemContainer,
    subItemPrice
  } = ticket();

  const { getCurrentQuantity, updateCurrentQuantity } = useManagerTicket({ items });
  const currentQuantity = getCurrentQuantity();

  return (
    <div className={container()}>
      <div className={item()}>
        <span className={itemName()}>{items.mainItemName}</span>
        <span className={itemPrice()}>{items.mainItemPrice}</span>
      </div>
      <div className={quantity()}>
        <Button buttonType="ghost" buttonColor="success" icon={<Image src={pencil} alt="edit icon" className={icon()} />}>editar</Button>
        <div className="flex justify-end w-[1.5rem]">
          {
            currentQuantity > 1 ?
              <button
                type="button"
                className={button({ variant: "enabled" })}
                onClick={() => updateCurrentQuantity(-1)}
              >
                <span className={sign()}>-</span>
              </button>
              :
              <Button buttonType="icon" buttonColor="success" icon={<Image src={trash} className={iconTrash()} alt="discard main dish" />}>{null}</Button>
          }
        </div>
        <span className={itemQuantity()}>{currentQuantity}</span>
        <button
          type="button"
          className={button({ variant: "enabled" })}
          onClick={() => updateCurrentQuantity(+1)}
        >
          <span className={sign()}>+</span>
        </button>
      </div>
      {
        items.subItems.map((subItem) => (
          <div className={category()} key={subItem.id}>
            <span className={categoryText({ variant: "title" })}> {subItem.category}</span>
            {
              subItem.items?.map((item) => (
                <div className={subItemContainer()} key={item.id}>
                  <span className={categoryText({ variant: "text" })}>{item.name}</span>
                  {item.price && <span className={subItemPrice()}>{item.price}</span>}
                </div>
              ))
            }
          </div>
        ))
      }
      <div className="flex gap-1 bg-surface-middleground px-2.5 rounded-sm">
        <span className="font-bold text-sm text-content-neutral-base">observação:</span>
        <span className="font-semibold text-sm text-content-neutral-base">{items.observationMessage}</span>
      </div>
    </div>
  );
};