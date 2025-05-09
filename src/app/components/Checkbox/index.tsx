import React from 'react';
import {
  Checkbox as RadixCheckbox,
  CheckboxIndicator as RadixCheckboxIndicator,
} from '@radix-ui/react-checkbox';
import check from '@/app/assets/check.svg';
import Image from 'next/image';
import { tv } from 'tailwind-variants';

// Defining variants to be easier to implement future features
const checkbox = tv({
  slots: {
    base: 'flex gap-2 items-center',
    checkbox: 'flex size-[16px] appearance-none items-center justify-center rounded-sm outline-none border-2',
    label: 'text-sm text-content-neutral-weak'
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

interface CheckboxProps {
  id: string;
  label: string;
}

type Products = {
  items: CheckboxProps[];
}

export const Checkbox = ({ items }: Products) => {
  const { base, checkbox: checkboxStyle, label } = checkbox();

  return (
    <>
      {items.map((item) => (
        <div className={base()} key={item.id}>
          <RadixCheckbox className={checkboxStyle()}>
            <RadixCheckboxIndicator>
              <Image src={check} alt="check icon" />
            </RadixCheckboxIndicator>
          </RadixCheckbox>
          <label className={label()}>
            {item.label}
          </label>
        </div>
      ))}
    </>
  );
};