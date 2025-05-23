import {
  Accordion as RadixAccordion,
  AccordionItem as RadixAccordionItem,
  AccordionTrigger as RadixAccordionTrigger,
  AccordionContent as RadixAccordionContent,
} from "@radix-ui/react-accordion";
import { tv } from "tailwind-variants";
import Image from "next/image";
import chevron from "@/app/assets/chevron.svg";
import dolarsign from "@/app/assets/dolarsign.svg";
import { shared } from "@/app/styles/shared-styles";
import { formatBRL } from "@/lib/format";
import { ProductItem } from "@/data/types/details";
import Link from "next/link";

// Defining styles to not overload the component
const accordion = tv({
  extend: shared,
  slots: {
    container: "w-full",
    item: "border-b border-gray-200 py-4 px-4 border-b-4 border-content-neutral-border",
    trigger: "group flex w-full items-center justify-between",
    content: "overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
    productName: "text-base font-bold",
    productDescription: "text-xs mt-1",
    variantItem: "flex justify-between items-center py-2 rounded-lg",
    icon: "h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180",
    offPrice: [
      shared().offPrice(),
      "line-through"
    ],
  },
  variants: {
    colorScheme: {
      neutral: {
        productName: "text-color-content-neutral-strong",
        productDescription: "text-content-neutral-weak",
        icon: "text-color-content-neutral-strong"
      },
      primary: {
        productName: "text-color-primary",
        productDescription: "text-primary-weak",
        icon: "text-color-primary"
      },
    },
  },
  defaultVariants: {
    colorScheme: "neutral"
  }
});

type AccordionProps = {
  items: ProductItem[];
  restaurantId: string,
  productDescription?: string;
  colorScheme?: "neutral" | "primary";
  type?: "single" | "multiple";
  collapsible?: boolean;
}

export const Accordion = ({
  items,
  restaurantId,
  colorScheme,
  type = "single",
  collapsible = true,
}: AccordionProps) => {
  const styles = accordion({ colorScheme });

  const BlockRoute = (route: string) => {
    if(route === "/restaurantes/restaurant-matsuri-concept/product/temaki-salmao") return route;
    else return "";
  }

  return (
    //Header
    <RadixAccordion type={type} collapsible={collapsible} className={styles.container()}>
      {items.map((product) => (
      <RadixAccordionItem value={product.id} key={product.id} className={styles.item()}>
        <RadixAccordionTrigger className={styles.trigger()}>
          <div className="flex items-center gap-3">
            <div className="text-left">
              <div className="flex gap-2">
                <h3 className={styles.productName()}>{product.name}</h3>
                {
                  !!product.hasSomeOffProduct &&
                  <Image src={dolarsign} alt="discont announcment" className="w-[18px]" />
                }
              </div>
              {product.description &&
                <p className={styles.productDescription()}>{product.description}</p>
              }
            </div>
          </div>
          <Image src={chevron} className={styles.icon()} alt="chevron icon" />
        </RadixAccordionTrigger>

        {/* Content */}
        <RadixAccordionContent className={styles.content()}>
          <div className="pt-4 px-4 space-y-3">
            {product.variants.map((variant) => (
              <Link key={variant.id} href={BlockRoute(`/restaurantes/${restaurantId}/product/${variant.id}`)}>
                <div className={styles.variantItem()}>
                  <div className="flex flex-col">
                    <span className="text-sm text-content-neutral-strong">{variant.name}</span>
                    <span className="text-xs text-content-neutral-weak">{variant.description}</span>
                  </div>
                  <div className="flex flex-col">
                    {variant.startingPrice && <span className="text-xs text-right text-content-neutral-weak">a partir de</span>}
                    <span className={`text-right ${variant.offPrice ? styles.offPrice() : styles.price()}`}>{formatBRL(variant.price)}</span>
                    {variant.offPrice &&
                      <div className="flex gap-1">
                        <Image src={dolarsign} alt="price icon" className="w-[12px]" />
                        <span className="text-sm text-content-success">{formatBRL(variant.offPrice)}</span>
                      </div>
                    }
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </RadixAccordionContent>
      </RadixAccordionItem>
      ))}
    </RadixAccordion>
  );
};
