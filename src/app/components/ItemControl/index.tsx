'use client';
import { useActionState, useState } from 'react';
import { tv } from 'tailwind-variants';
import { shared } from "@/app/styles/shared-styles";
import { Products, useControl } from './hooks';

const itemControl = tv({
  slots: {
    container: 'flex flex-col gap-2',
    form: 'flex justify-between items-center',
    productGroup: 'flex gap-2',
    buttonGroup: 'flex gap-3',
    button: [
      'border-2 size-[24px] rounded-full',
      'flex justify-center items-center',
    ],
    sign: [
      'h-full',
      'leading-none'
    ],
    quantity: [
      'font-bold text-sm text-content-neutral-base',
      'h-full text-center w-[1rem] pt-[2px]'
    ],
    label: [
      'text-content-neutral-weak text-sm font-semibold',
      'pt-[2px]'
    ],
    price: [
      shared().price(),
      "before:content-['+']"
    ]
  },
  variants: {
    variant: {
      plus: {
        button: [
          'border-content-secondary-base',
          'bg-surface-background hover:bg-surface-middleground',
          'text-content-secondary-base'
        ]
      },
      minus: {
        button: [
          'border-content-neutral-border',
          'bg-surface-foreground',
          'text-content-neutral-weakest'
        ]
      }
    }
  }
});

export const ItemControl = (itemsArray: Products) => {
  const {
    container,
    form,
    productGroup,
    buttonGroup,
    button,
    sign,
    quantity,
    label,
    price
  } = itemControl();

  const { getCurrentQuantity, updateQuantity } = useControl(itemsArray);
  const { items } = itemsArray;

  return (
    <div className={container()}>
      {
        items.map((item) => {
          const currentQuantity = getCurrentQuantity(item.id);
          // const totalPrice = currentQuantity * parseFloat(item.price.replace('R$ ', '').replace(',', '.'));

          return (
            <div className={form()} key={item.id}>
              <div className={productGroup()}>
                <div className={buttonGroup()}>
                  <button
                    type="submit"
                    name="action"
                    value="decrement"
                    onClick={() => updateQuantity(item.id, -1)}
                    className={button({ variant: currentQuantity <= 0 ? "minus" : "plus" })}
                    disabled={currentQuantity <= 0}
                  >
                    <span className={sign()}>-</span>
                  </button>
                  <label className={quantity()}>{currentQuantity}</label>
                  <button
                    type="submit"
                    name="action"
                    value="increment"
                    onClick={() => updateQuantity(item.id, +1)}
                    className={button({ variant: "plus" })}
                  >
                    <span className={sign()}>+</span>
                  </button>
                </div>
                <label className={label()}>{item.label}</label>
              </div>
              <input type="hidden" name="productId" value={item.id} />
              <label className={price()}>{item.price}</label>
            </div>
          )
        })
      }
    </div>
  );
}