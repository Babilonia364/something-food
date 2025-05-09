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

// Defining styles to not overload the component
const accordion = tv({
  slots: {
    base: "w-full",
    item: "border-b border-gray-200 py-4 border-b-4 border-content-neutral-border",
    trigger: "group flex w-full items-center justify-between",
    content: "overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
    productName: "text-base font-bold",
    productDescription: "text-xs mt-1",
    variantItem: "flex justify-between items-center py-2 px-4 rounded-lg",
    icon: "h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180",
    price: 'text-sm text-content-primary',
    offPrice: 'text-xs line-through text-content-neutral-weak',
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

type ProductVariant = {
  id: string;
  name: string;
  price: string;
  offPrice?: string;
  description?: string;
  startingPrice?: boolean;
};

type ProductItem = {
  id: string;
  name: string;
  hasSomeOffProduct?: boolean;
  description?: string;
  icon?: React.ReactNode;
  variants: ProductVariant[];
};

type AccordionProps = {
  items: ProductItem[];
  productDescription?: string;
  colorScheme?: "neutral" | "primary";
  type?: "single" | "multiple";
  collapsible?: boolean;
}

export const Accordion = ({
  items,
  colorScheme,
  type = "single",
  collapsible = true,
}: AccordionProps) => {
  const styles = accordion({ colorScheme });

  return (
    //Header
    <RadixAccordion type={type} collapsible={collapsible} className={styles.base()}>
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
          <div className="pt-4 space-y-3">
            {product.variants.map((variant) => (
              <div key={variant.id} className={styles.variantItem()}>
                <div className="flex flex-col">
                  <span className="text-sm text-content-neutral-strong">{variant.name}</span>
                  <span className="text-xs text-content-neutral-weak">descriptons</span>
                </div>
                <div className="flex flex-col">
                  {variant.startingPrice && <span className="text-xs text-right text-content-neutral-weak">a partir de</span>}
                  <span className={`text-right ${variant.offPrice ? styles.offPrice() : styles.price()}`}>{variant.price}</span>
                  {variant.offPrice &&
                    <div className="flex gap-1">
                      <Image src={dolarsign} alt="price icon" className="w-[12px]" />
                      <span className="text-sm text-content-success">{variant.offPrice}</span>
                    </div>
                  }
                </div>
              </div>
            ))}
          </div>
        </RadixAccordionContent>
      </RadixAccordionItem>
      ))}
    </RadixAccordion>
  );
};
