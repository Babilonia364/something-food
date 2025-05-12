'use client';
import { tv } from "tailwind-variants";
import { Checkbox } from "@/app/components/Checkbox";
import { ItemControl } from "@/app/components/ItemControl";
import { RadioGroup } from "@/app/components/RadioGroup";
import { Categories, Product } from "@/data/types/products";
import { ProductProvider } from "@/app/context/ProductContext";
import { MainDish } from "./MainDish";
import { useEffect, useState } from "react";
import { formatBRL } from "@/lib/format";
import Image from "next/image";
import { getCookie } from "cookies-next";

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

  const cookieData = getCookie('restaurantData');
  const restaurantData =  cookieData ? JSON.parse(cookieData.toString()) : {};

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(restaurantData.description || "");

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) return <div>Empty State</div>

  return (
    <ProductProvider>
      <div className="flex flex-col">
        <Image className="min-w-100 h-auto" src={items.image} width={1080} height={521} alt="" />
        <div className="flex flex-col gap-1 mb-4 px-2">
          <p className="font-bol text-xl text-content-neutral-base">{items.name}</p>
          <div className="flex items-center gap-1 mb-1">
            <p className="font-bold text-sm text-content-neutral-weak">{`a partir de`}</p>
            <p className="font-bold text-lg text-content-primary">{formatBRL(items.minPrice)}</p>
          </div>
          <p className="text-xs font-medium text-content-neutral-weak">{items.description}</p>
        </div>
        <MainDish name={items.name} description={description} logo={items.logo} restaurantName={items.restaurantName} />
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
                  <RadioGroup items={item.additionals} categoryName={item.category} categoryId={item.id} mainCategory />
                ) : (
                  <ItemControl items={item.additionals} categoryName={item.category} categoryId={item.id} />
                )}
              </div>
              <div className={styles.separator()} />
            </div>
          ))
        }
        <div className="flex items-center justify-center my-4">
          <textarea
            className="w-87 p-3 border border-content-neutral-border rounded-lg placeholder-content-neutral-weak text-sm"
            placeholder={`alguma observação do item? ● opcional \nex: tirar algum ingrediente, ponto do prato`}
            rows={2}
            onChange={e => {setDescription(e.target.value)}}
            value={description}
          />
        </div>
      </div>
    </ProductProvider>
  );
}