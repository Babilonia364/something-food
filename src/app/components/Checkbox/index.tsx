'use client'
import React, { useEffect, useState } from 'react';
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

interface IAdditionals {
  items: Additional[];
  limit?: number;
  categoryName: string;
  categoryId: string
}

export const Checkbox = ({ items, limit, categoryName, categoryId }: IAdditionals) => {
  const { base, item, checkbox: checkboxStyle, label, price } = checkbox();
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const { selectedItems, setSelectedItems, addProductToCategory, removeProductFromCategory } = useProductContext();

  useEffect(() => {
    const initialCheckedState: Record<string, boolean> = {};

    selectedItems?.forEach(category => {
      category.products.forEach(product => {
        if(categoryId === category.id) initialCheckedState[product.id] = true;
      });
    });

    setCheckedState(initialCheckedState);
  }, [selectedItems, categoryId]);

  const onCheckedChange = (checked: boolean, itemId: string, itemName: string, itemPrice?: number) => {
    const auxSelected = selectedItems || [];
    const newCheckedState = { ...checkedState };

    newCheckedState[itemId] = checked;
    setCheckedState(newCheckedState);

    if (checked) {
      addProductToCategory(auxSelected, categoryId, categoryName, itemId, itemName, itemPrice || 0);
    } else {
      removeProductFromCategory(auxSelected, categoryId, itemId);
    }

    setSelectedItems([...auxSelected]);
  };

  const isDisabled = (itemId: string) => {
    if (limit === undefined) return false;

    const selectedCount = Object.values(checkedState).filter(Boolean).length;

    return selectedCount >= limit && !checkedState[itemId];
  };

  return (
    <>
      {items.map((product) => (
        <div className={base()} key={product.id}>
          <div className={item()}>
            <RadixCheckbox
              className={checkboxStyle({ state: isDisabled(product.id) ? "disabled" : "default" })}
              id={product.id}
              disabled={isDisabled(product.id)}
              onCheckedChange={(checked) => onCheckedChange(checked === true, product.id, product.label, product.price)}
              checked={checkedState[product.id] || false}
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