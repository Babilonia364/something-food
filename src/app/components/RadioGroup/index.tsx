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
import { useProductContext } from "@/app/context/ProductContext";

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
  categoryName: string,
  categoryId: string,
  mainCategory?: boolean,
};

export const RadioGroup = ({ items, categoryName, categoryId, mainCategory }: IAdditionals) => {
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
  const { selectedItems, setSelectedItems, mainItem, setMainItem, replaceFirstProduct } = useProductContext();

  const OnValueChange = (value: string) => {
    const [label, id, price, offPrice] = value.split('|');
    const itemOffPrice: number = offPrice !== undefined ? parseFloat(offPrice) : 0;
    const itemPrice: number = price !== undefined ? parseFloat(price) : 0;
    const finalPrice: number = itemOffPrice > 0 ? itemOffPrice : itemPrice;

    if (mainCategory) {
      const auxSelected = mainItem || { id: "", name: "", category: "", quantity: 0, price: 0 };

      auxSelected.id = id;
      auxSelected.name = label;
      auxSelected.quantity = 0;
      auxSelected.category = categoryName;
      auxSelected.price = finalPrice;
      auxSelected.realPrice = itemPrice;
      auxSelected.offPrice = itemOffPrice || 0;

      setMainItem({ ...auxSelected });
    } else {
      const auxSelected = selectedItems || {};
      replaceFirstProduct(auxSelected, categoryId, categoryName, { id: id, name: label, quantity: 1, price: finalPrice || 0, offPrice: itemOffPrice || 0 });
      setSelectedItems([...auxSelected]);
    }
  }

  const DefaultValue = () => {
    let defaultValue = "";
    if (mainCategory) {
      defaultValue = `${mainItem.name}|${mainItem.id}|${mainItem?.realPrice}|${mainItem?.offPrice}`;
    } else {
      selectedItems?.forEach(category => {
        category.products.forEach(product => {
          if (categoryId === category.id) defaultValue = `${product.name}|${product.id}|${product?.price}|${product?.offPrice}`;
        });
      });
    }

    return defaultValue;
  };

  return (
    <RadixRadioGroup className={container()} aria-label="View density" name="casssssa" onValueChange={OnValueChange} value={DefaultValue()}>
      {items.map((item) => {
        const hasDiscount = !!item.offPrice;

        return (
          <div className={itemContainer()} key={item.id}>
            <div className={radioGroupStyle()}>
              <RadixRadioGroupItem
                value={`${item.label}|${item.id}|${item?.price || 0}|${item?.offPrice || 0}`}
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