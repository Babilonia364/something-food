import { tv } from 'tailwind-variants';
import { shared } from "@/app/styles/shared-styles";

const itemControl = tv({
  slots: {
    form: 'flex flex-col gap-2',
    container: 'flex justify-between items-center',
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
    form,
    container,
    productGroup,
    buttonGroup,
    button,
    sign,
    quantity,
    label,
    price
  } = itemControl();

  return (
    <form className={form()}>
      {
        items.map((item) => (
          <div className={container()} key={item.id}>
            <div className={productGroup()}>
              <div className={buttonGroup()}>
                <button className={button({ variant: "minus" })}>
                  <span className={sign()}>-</span>
                </button>
                <label className={quantity()}>0</label>
                <button className={button({ variant: "plus" })}>
                  <span className={sign()}>+</span>
                </button>
              </div>
              <label className={label()}>{item.label}</label>
            </div>
            <label className={price()}>{item.price}</label>
          </div>
        ))
      }
    </form>
  );
}