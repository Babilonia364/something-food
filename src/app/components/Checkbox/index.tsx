'use client'
import React, { useState } from 'react';
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
import { useProductContext } from '@/app/context/ProductContext';

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
      disabled: {
        checkbox: 'bg-surface-foreground border-content-neutral-weakest hover:bg-surface-middleground'
      },
    }
  },
  defaultVariants: {
    state: 'default'
  }
});

type CheckboxState = {
  [key: string]: boolean | number,
}

interface IAdditionals {
  items: Additional[];
  limit?: number;
  categoryName: string;
  categoryId: string
}

export const Checkbox = ({ items, limit, categoryName, categoryId }: IAdditionals) => {
  const { base, item, checkbox: checkboxStyle, label, price } = checkbox();
  const [checkedObj, setCheckedObj] = useState<CheckboxState>();
  const { selectedItems, setSelectedItems, addProductToCategory, removeProductFromCategory } = useProductContext();

  const onCheckedChange = (checked: string | boolean, itemId: string, itemName: string, itemPrice?: number) => {
    const auxArray = { ...checkedObj };
    const auxSelected = selectedItems || [];

    if (auxArray[itemId] === undefined) {
      auxArray[itemId] = false
    }
    if (auxArray.length === undefined) {
      auxArray.length = 0;
    }
    auxArray[itemId] = (checked === true);
    let aux = auxArray.length as number;
    if (checked === true) {
      aux += 1
      addProductToCategory(auxSelected, categoryId, categoryName, itemId, itemName, itemPrice || 0);
    } else if (checked === false) {
      removeProductFromCategory(auxSelected, categoryId, itemId)
      aux -= 1;
    }


    auxArray.length = aux;
    setCheckedObj(auxArray);
    setSelectedItems([...auxSelected]);
  }

  const isDisabled = (itemId: string) => {
    if (limit === undefined) return false;
    if (checkedObj === undefined) return false;
    const len = checkedObj.length as number;

    return ((len >= limit) && !checkedObj[itemId]);
  }

  return (
    <>
      {items.map((product) => (
        <div className={base()} key={product.id}>
          <div className={item()}>
            <RadixCheckbox
              className={checkboxStyle({ state: isDisabled(product.id) ? "disabled" : "default" })}
              id={product.id}
              disabled={isDisabled(product.id)}
              onCheckedChange={(checked) => onCheckedChange(checked, product.id, product.label, product.price)}
            >
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