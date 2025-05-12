import Image from "next/image";
import { tv } from "tailwind-variants";
import bikeTeal from "@/app/assets/bike-teal.svg";
import star from "@/app/assets/star.svg";
import biker from "@/app/assets/biker.svg";
import { formatBRLNoSpace } from "@/lib/format";
import { Client } from "@/data/types/restaurants";
import Link from "next/link";

const clientCard = tv({
  slots: {
    logo: [
      'rounded-l-sm object-contain',
    ],
    logoContainer: [
      'flex bg-surface-background',
      'min-w-[72px] max-w-[72px] min-h-[72px] max-h-[72px]'
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
  },
  variants: {
    variant: {
      enabled: {
        logo: '',
      },
      disabled: {
        logo: 'opacity-40',
      }
    }
  },
});

type Clients = {
  items: Client[],
  variant?: "enabled" | "disabled"
};

export const ClientCard = ({ items, variant = "enabled" }: Clients) => {
  const styles = clientCard();

  const BlockRoute = (route: string) => {
    if(variant === "disabled") return "";
    if(route === "/restaurantes/restaurant-matsuri-concept") return route;
    else return "";
  }

  return (
    <div className="flex flex-col gap-4">
      {
        items.map((item) => (
          <Link
            href={BlockRoute(`/restaurantes/${item.id}`)}
            key={item.id}
          >
            <div className="flex">
              <div className={styles.logoContainer()}>
                <Image
                  src={item.logo}
                  alt="Restaurant name"
                  width={72}
                  height={72}
                  className={styles.logo({ variant })}
                />
              </div>
              <div className={styles.attributes()}>
                <h2 className={styles.title()}>{item.name}</h2>
                <div className="flex gap-1 items-center">
                  {
                    item.deliveryPrice <= 0 ?
                      <>
                        <Image src={bikeTeal} alt="free delivery" className={styles.iconBike()} />
                        <span className={styles.deliveryText()}>grátis</span>
                      </>
                      :
                      <>
                        <Image src={biker} alt="delivery price" className={styles.iconBiker()} />
                        <span className={styles.deliveryPrice()}>{formatBRLNoSpace(item.deliveryPrice)}</span>
                      </>
                  }
                  <Image src={star} alt="restaurant rating" className={styles.iconStar()} />
                  <span className={styles.ratingText()}>{item.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
}