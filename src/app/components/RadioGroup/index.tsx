import { shared } from "@/app/styles/shared-styles";
import {
  RadioGroup as RadixRadioGroup,
  RadioGroupItem as RadixRadioGroupItem,
  RadioGroupIndicator as RadixRadioGroupIndicator
} from "@radix-ui/react-radio-group";
import Image from "next/image";
import { tv } from "tailwind-variants";
import dolarsign from "@/app/assets/dolarsign.svg";
import { Additional } from "@/data/types/products";
import { formatBRL } from "@/lib/format";

const radioGroup = tv({
  extend: shared,
  slots: {
    container: "flex flex-col gap-3",
    itemContainer: "flex justify-between",
    radioGroup: "flex items-center gap-2",
    radioItem: [
      "size-[16px] border-2 rounded-full bg-surface-background outline-none",
      "border-content-neutral-weakest hover:bg-surface-middleground cursor-default"
    ],
    radioIndicator: [
      "relative flex size-full items-center justify-center",
      "after:block after:size-[8px] after:rounded-full after:bg-content-neutral-weakest"
    ],
    originalPrice: [shared().offPrice()],
    price: [shared().price()],
    discountBadge: "w-[18px]",
  },
  variants: {
    isAdditional: {
      true: {
        price: "before:content-['+']"
      }
    }
  }
});

interface IAdditionals {
  items: Additional[];
};

export const RadioGroup = ({ items }: IAdditionals) => {
  const {
    container,
    itemContainer,
    radioGroup: radioGroupStyle,
    radioItem,
    radioIndicator,
    originalPrice,
    discountBadge,
    label,
    price,
    offPrice
  } = radioGroup();

  return (
    <RadixRadioGroup className={container()} aria-label="View density">
      {items.map((item) => {
        const hasDiscount = !!item.offPrice;
        
        return (
          <div className={itemContainer()} key={item.id}>
            <div className={radioGroupStyle()}>
              <RadixRadioGroupItem 
                value={item.id} 
                className={radioItem()} 
                id={item.id}
              >
                <RadixRadioGroupIndicator className={radioIndicator()} />
              </RadixRadioGroupItem>
              
              {hasDiscount && <Image src={dolarsign} alt="off price offer" className={discountBadge()} />}
              
              <label className={label()} htmlFor={item.id}>
                {item.label}
              </label>
            </div>
            
            <div>
              {hasDiscount && item.price && (
                <>
                  <span className={originalPrice()}>de {formatBRL(item.price)}</span>
                  <span className={offPrice()}> por </span>
                </>
              )}
              
              <span className={price({
                isAdditional: item.isAdditional
              })}>
                {(hasDiscount && item.offPrice) ? formatBRL(item.offPrice) : (item.price && formatBRL(item.price))}
              </span>
            </div>
          </div>
        );
      })}
    </RadixRadioGroup>
  );
};