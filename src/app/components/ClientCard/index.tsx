import Image from "next/image";
import { tv } from "tailwind-variants";
import bikeTeal from "@/app/assets/bike-teal.svg";
import star from "@/app/assets/star.svg";
import biker from "@/app/assets/biker.svg";
import { formatBRL } from "@/lib/format";

const clientCard = tv({
  slots: {
    logo: [
      'w-[72px] h-[72px] rounded-l-sm',
    ],
    attributes: [
      'flex flex-col w-full justify-center',
      'bg-surface-middleground',
      'px-3 rounded-r-sm gap-1.5'
    ],
    title: [
      'text-content-neutral-base font-bold text-base',
      'gap-1'
    ],
    iconBike: 'w-[18px] h-auto',
    iconBiker: 'w-[18px] h-auto',
    deliveryText: 'text-sm text-content-secondary-base font-bold mr-1',
    deliveryPrice: 'text-sm font-bold text-content-primary mr-1',
    iconStar: 'w-[18px] h-auto',
    ratingText: 'text-sm font-bold text-content-neutral-weak',
  }
});

type Client = {
  name: string,
  deliveryPrice: number,
  rating: number,
};

export const ClientCard = () => {
  const styles = clientCard();
  const logoLink = "https://play-lh.googleusercontent.com/LRl6A3uZGvY_u5lAUyNjKmQHgKVgoBahK39L0UpCbaswaQnpCKA7ABpPcraE3kNvKQ=w240-h480-rw";
  const deliveryPrice = 11;

  return (
    <div className="flex">
      <Image src={logoLink} alt="Matsuri Concept" width={72} height={72} className={styles.logo()} />
      <div className={styles.attributes()}>
        <h2 className={styles.title()}>Matsuri Concept</h2>
        <div className="flex gap-1 items-center">
          {
            deliveryPrice <= 0 ?
            <>
              <Image src={bikeTeal} alt="free delivery" className={styles.iconBike()} />
              <span className={styles.deliveryText()}>grátis</span>
            </>
            :
            <>
              <Image src={biker} alt="delivery price" className={styles.iconBiker()} />
              <span className={styles.deliveryPrice()}>{formatBRL(deliveryPrice).replace(/\s/g, '')}</span>
            </>
          }
          <Image src={star} alt="restaurant rating" className={styles.iconStar()} />
          <span className={styles.ratingText()}>4.7</span>
        </div>
      </div>
    </div>
  );
}