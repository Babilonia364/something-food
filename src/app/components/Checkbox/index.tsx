import React from 'react';
import {
  Checkbox as RadixCheckbox,
  CheckboxIndicator as RadixCheckboxIndicator,
} from '@radix-ui/react-checkbox';
import check from '@/app/assets/check.svg';
import Image from 'next/image';

interface CheckboxProps {
  id: string;
  label: string;
}

type Products = {
  items: CheckboxProps[];
}

export const Checkbox = ({ items }: Products) => {

  return (
    items.map((item) =>
      <div className='flex gap-2 items-center' key={item.id}>
        <RadixCheckbox className="flex size-[16px] appearance-none items-center justify-center rounded-sm bg-surface-background outline-none border-2 border-content-neutral-weakest hover:bg-surface-middleground">
          <RadixCheckboxIndicator>
            <Image src={check} alt="check icon" />
          </RadixCheckboxIndicator>
        </RadixCheckbox>
        <label className='text-sm text-content-neutral-weak'>
          {item.label}
        </label>
      </div>
    )
  );
};
