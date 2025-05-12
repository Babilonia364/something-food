'use client';
import { tv } from "tailwind-variants";
import { Checkbox } from "@/app/components/Checkbox";
import { ItemControl } from "@/app/components/ItemControl";
import { RadioGroup } from "@/app/components/RadioGroup";
import { Categories, Product } from "@/data/types/products";
import { ProductProvider } from "@/app/context/ProductContext";

const productPage = tv({
  slots: {
    additionalsContainer: 'flex flex-col gap-4 px-2',
    text: '',
    tag: [
      'bg-surface-neutral-base rounded-sm',
      'px-2 py-1'
    ],
    separator: 'w-100 border-b-4 border-content-neutral-border py-2',
  },
  variants: {
    variant: {
      primary: {
        text: 'font-bold text-base text-content-neutral-strong'
      },
      secondary: {
        text: 'font-bold text-xs text-content-neutral-weak'
      },
      tag: {
        text: 'font-medium text-xs text-content-neutral-white'
      }
    }
  }
});

interface IProductClient {
  items: Product,
}

export default function ProductClient({ items }: IProductClient) {
  const styles = productPage();

  return (
    <ProductProvider>
      <div className="flex flex-col">
        {
          items.categories.map((item: Categories) => (
            <div className="pt-4" key={item.id}>
              <div className={styles.additionalsContainer()}>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <div className={styles.text({ variant: "primary" })}>{item.category}</div>
                    {item.isMandatory && item.hasLimit && item.limit <= 1 && <p className={styles.text({ variant: "secondary" })}>escolha 1</p>}
                    {item.isMandatory && item.hasLimit && item.limit > 1 && <p className={styles.text({ variant: "secondary" })}>escolha 1 a {item.limit}</p>}
                    {!item.isMandatory && item.hasLimit && <p className={styles.text({ variant: "secondary" })}>escolha até {item.limit}</p>}
                    {!item.isMandatory && !item.hasLimit && <p className={styles.text({ variant: "secondary" })}>escolha quantos quiser</p>}
                  </div>
                  {item.isMandatory && <div className={styles.tag()}><p className={styles.text({ variant: "tag" })}>obrigatório</p></div>}
                </div>
                {item.hasLimit && item.limit && item.limit > 1 ? (
                  <Checkbox items={item.additionals} limit={item.limit} categoryName={item.category} categoryId={item.id} />
                ) : item.hasLimit && item.limit && item.limit === 1 ? (
                  <RadioGroup items={item.additionals} categoryName={item.category} categoryId={item.id} mainCategory={item.mainCategory} />
                ) : (
                  <ItemControl items={item.additionals} categoryName={item.category} categoryId={item.id} />
                )}
              </div>
              <div className={styles.separator()} />
            </div>
          ))
        }
      </div>
    </ProductProvider>
  );
}