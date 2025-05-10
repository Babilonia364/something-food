'use client';
import { useActionState } from 'react';
import { tv } from 'tailwind-variants';
import { shared } from "@/app/styles/shared-styles";
import { updateQuantity } from '@/app/actions';

const itemControl = tv({
  slots: {
    container: 'flex flex-col gap-2',
    form: 'flex justify-between items-center',
    productGroup: 'flex gap-2',
    buttonGroup: 'flex gap-4',
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
      'h-full pt-[2px]'
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

type Product = {
  id: string;
  label: string;
  price: string;
}

type Products = {
  items: Product[];
}

export const ItemControl = ({ items }: Products) => {
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

  const initialState = {
    items: items.map(item => ({
      id: item.id,
      quantity: 0
    }))
  };
  const [state, formAction] = useActionState(updateQuantity, initialState);

  const getCurrentQuantity = (productId: string) => {
    return state.items.find(item => item.id === productId)?.quantity || 0;
  };

  return (
    <div className={container()}>
      {
        items.map((item) => {
          const currentQuantity = getCurrentQuantity(item.id);
          // const totalPrice = currentQuantity * parseFloat(item.price.replace('R$ ', '').replace(',', '.'));

          return (
            <form className={form()} action={formAction} key={item.id}>
              <div className={productGroup()}>
                <div className={buttonGroup()}>
                  <button
                    type="submit"
                    name="action"
                    value="decrement"
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
                    className={button({ variant: "plus" })}
                  >
                    <span className={sign()}>+</span>
                  </button>
                </div>
                <label className={label()}>{item.label}</label>
              </div>
              <input type="hidden" name="productId" value={item.id} />
              <label className={price()}>{item.price}</label>
            </form>
          )
        })
      }
    </div>
  );
}