import { tv } from "tailwind-variants";
import { Button } from "../Button";
import Image from "next/image";
import share from "@/app/assets/share.svg";
import heart from "@/app/assets/heart.svg";

const details = tv({
  slots: {
    container: 'flex flex-col',
    shareIcon: 'min-w-[16px] h-auto',
    heartIcon: 'min-w-[20px] h-auto',
    moreInfo: 'text-xs font-bold text-content-secondary-base',
    moreInfoChevron: 'text-xs font-bold text-content-secondary-base mt-[1px]',
  }
});

export const Details = () => {
  const styles = details();

  return (
    <div className={styles.container()}>
      <div className="flex justify-between items-center px-2">
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
          <span className={styles.moreInfo()}>mais infos</span>
          <span className={styles.moreInfoChevron()} >{'>'}</span>
        </div>
      </div>
    </div>
  );
}