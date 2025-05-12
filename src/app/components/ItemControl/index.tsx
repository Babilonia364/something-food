'use client';
import { tv } from 'tailwind-variants';
import { shared } from "@/app/styles/shared-styles";
import { Products, useControl } from './hooks';
import { formatBRL } from '@/lib/format';

const itemControl = tv({
  slots: {
    container: 'flex flex-col gap-2',
    form: 'flex justify-between items-center',
    productGroup: 'flex gap-2',
    buttonGroup: 'flex gap-3',
    button: shared().button(),
    sign: shared().sign(),
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
      enabled: {
        button: shared().button({ variant: "enabled" })
      },
      disabled: {
        button: shared().button({ variant: "disabled" })
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

          return (
            <div className={form()} key={item.id}>
              <div className={productGroup()}>
                <div className={buttonGroup()}>
                  <button
                    type="button"
                    name="action"
                    value="decrement"
                    onClick={() => updateQuantity(item.id, item.label, -1, item.price)}
                    className={button({ variant: currentQuantity <= 0 ? "disabled" : "enabled" })}
                    disabled={currentQuantity <= 0}
                  >
                    <span className={sign()}>-</span>
                  </button>
                  <label className={quantity()}>{currentQuantity}</label>
                  <button
                    type="button"
                    name="action"
                    value="increment"
                    onClick={() => updateQuantity(item.id, item.label, +1, item.price)}
                    className={button({ variant: "enabled" })}
                  >
                    <span className={sign()}>+</span>
                  </button>
                </div>
                <label className={label()}>{item.label}</label>
              </div>
              <input type="hidden" name="productId" value={item.id} />
              <label className={price()}>{item.price && formatBRL(item.price)}</label>
            </div>
          )
        })
      }
    </div>
  );
}