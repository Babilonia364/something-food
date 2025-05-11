import { tv } from "tailwind-variants";
import { Button } from "../Button";
import Image from "next/image";
import share from "@/app/assets/share.svg";
import heart from "@/app/assets/heart.svg";
import bikePurple from "@/app/assets/bike-purple.svg";
import star from "@/app/assets/star.svg";
import { formatBRL } from "@/lib/format";
import { DetailsType } from "@/data/types/details";

const details = tv({
  slots: {
    container: 'flex flex-col gap-2',
    section: 'flex items-center px-2',
    shareIcon: 'min-w-[16px] h-auto',
    heartIcon: 'min-w-[20px] h-auto',
    moreInfo: 'text-xs font-bold text-content-secondary-base',
    chevron: 'text-xs font-bold text-content-secondary-base',
    bikeIcon: 'w-[18px] h-auto',
    deliveryPrice: 'font-bold text-sm text-content-primary',
    separator: 'text-xs font-bold text-content-neutral-weakest',
    grayText: 'text-xs font-bold text-content-neutral-weak',
    greenText: 'text-xs font-bold text-content-success',
    deliveryTaxText: 'text-xs font-bold text-content-secondary-strong',
    starIcon: 'w-[12px] h-auto',
  },
  variants: {
    variant: {
      moreInfo: {
        section: 'justify-between',
        chevron: 'text-content-secondary-base mt-[1px]'
      },
      delivery: {
        section: 'gap-2 px-1',
        chevron: 'text-content-primary'
      },
      deliveryTax: {
        section: [
          'max-w-max',
          'bg-surface-background-variant py-2 mx-0.5',
        ]
      },
      specs: {
        section: 'gap-2 px-1',
      },
      minOrder: {
        section: 'px-0.5',
      },
    }
  }
});

export const Details = ({ item }: { item: DetailsType }) => {
  const styles = details();

  return (
    <div className={styles.container()}>
      <div className={styles.section({ variant: 'moreInfo' })}>
        <div className="flex gap-5">
          <Button
            buttonType="icon"
            icon={<Image src={share} alt="press to share" className={styles.shareIcon()} />}
          >
            {null}
          </Button>
          <Button
            buttonType="icon"
            icon={<Image src={heart} alt="press to like" className={styles.heartIcon()} />}
          >
            {null}
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <p className={styles.moreInfo()}>mais infos</p>
          <p className={styles.chevron({ variant: 'moreInfo' })} >{'>'}</p>
        </div>
      </div>
      <div className={styles.section({ variant: 'delivery' })}>
        <Image src={bikePurple} alt="delivery has a price" className={styles.bikeIcon()} />
        <p className={styles.deliveryPrice()}>{formatBRL(item.price)}</p>
        <span className={styles.chevron({ variant: 'delivery' })} >{'>'}</span>
        <span className={styles.separator()}>•</span>
        <p className={styles.grayText()}>hoje, {item.estimatedTimeMin}</p>
        <span className={styles.separator()}>•</span>
        <p className={styles.grayText()}>{item.distance}</p>
      </div>
      <div className={styles.section({ variant: 'deliveryTax' })}>
        <p className={styles.deliveryTaxText()}>entrega grátis acima de {formatBRL(item.freeDeliveryPrice)}</p>
      </div>
      <div className={styles.section({ variant: 'specs' })}>
        <Image src={star} alt="rating of restaurant" className={styles.starIcon()} />
        <p className={styles.grayText()}>{item.rating} de 5</p>
        <span className={styles.chevron({ variant: 'moreInfo' })}>{'>'}</span>
        <span className={styles.separator()}>•</span>
        <p className={styles.greenText()}>fecha às {item.closeAt}</p>
      </div>
      <div className={styles.section({ variant: 'minOrder' })}>
        <p className={styles.grayText({ variant: 'minOrder' })}>pedido mínimo: {formatBRL(item.minOrder)}</p>
      </div>
    </div>
  );
}