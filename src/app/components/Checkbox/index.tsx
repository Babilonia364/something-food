import React from 'react';
import {
  Checkbox as RadixCheckbox,
  CheckboxIndicator as RadixCheckboxIndicator,
} from '@radix-ui/react-checkbox';
import check from '@/app/assets/check.svg';
import Image from 'next/image';
import { tv } from 'tailwind-variants';
import { shared } from '@/app/styles/shared-styles';
import { Additional } from '@/data/types/products';
import { formatBRL } from '@/lib/format';

// Defining variants to be easier to implement future features
const checkbox = tv({
  extend: shared,
  slots: {
    base: 'flex justify-between',
    item: 'flex gap-2 items-center',
    checkbox: 'flex size-[16px] appearance-none items-center justify-center rounded-sm outline-none border-2',
  },
  variants: {
    state: {
      default: {
        checkbox: 'bg-surface-background border-content-neutral-weakest hover:bg-surface-middleground'
      },
    }
  },
  defaultVariants: {
    state: 'default'
  }
});

interface IAdditionals {
  items: Additional[];
}

export const Checkbox = ({ items }: IAdditionals) => {
  const { base, item, checkbox: checkboxStyle, label, price } = checkbox();

  return (
    <>
      {items.map((product) => (
        <div className={base()} key={product.id}>
          <div className={item()}>
            <RadixCheckbox className={checkboxStyle()} id={product.id}>
              <RadixCheckboxIndicator>
                <Image src={check} alt="check icon" />
              </RadixCheckboxIndicator>
            </RadixCheckbox>
            <label className={label()} htmlFor={product.id}>
              {product.label}
            </label>
          </div>
          <label className='flex'>
            {product.isAdditional && <span className={price()}>+</span>}
            {product.price && <span className={price()}>{formatBRL(product.price)}</span>}
          </label>
        </div>
      ))}
    </>
  );
};