import Image from "next/image";
import { tv } from "tailwind-variants";

const logoCard = tv({
  slots: {
    container: 'flex items-center gap-1.5',
    logo: 'rounded-sm object-contain',
    logoContainer: [
      'flex bg-surface-background',
      'min-w-[36px] max-w-[36px] min-h-[36px] max-h-[36px]'
    ],
    name: 'text-content-neutral-strong font-bold text-xl',
    checkoutText: 'text-sm font-bold text-content-neutral-weak',
  },
  variants: {
    variant: {
      checkout: {
        container: 'gap-2',
        name: 'text-base',
      }
    }
  }
});

interface IlogoCard {
  variant?: "checkout",
  name: string,
  logo: string
}

export const LogoCard = ({ variant, name, logo }: IlogoCard) => {
  const styles = logoCard();

  return (
    <div className={styles.container({ variant })}>
      <div className={styles.logoContainer()}>
        <Image
          src={logo}
          width={36}
          height={36}
          alt="restaurant logo"
          className={styles.logo()}
        />
      </div>
      <div className="flex flex-col justify-between">
        {
          variant && variant === "checkout" &&
          <span className={styles.checkoutText()}>seus itens em</span>
        }
        <span className={styles.name({ variant })}>{name}</span>
      </div>
    </div>
  );
};