import { useProductContext } from "@/app/context/ProductContext";
import { formatBRL } from "@/lib/format";
import { Button } from "../Button";
import Image from "next/image";
import plus from "@/app/assets/plus.svg";
import trash from "@/app/assets/trash.svg";
import minus from "@/app/assets/minus.svg";


export const MainDish = () => {

  const { mainItem, setMainItem, total } = useProductContext();

  const OnClick = () => {
    const auxMainItem = { ...mainItem };

    auxMainItem.quantity = 1;

    setMainItem(auxMainItem);
  }

  const ChangeQuantity = (quantity: number) => {
    const auxMainItem = { ...mainItem }

    auxMainItem.quantity += quantity;

    setMainItem(auxMainItem);
  }

  const isMainItemEmpty = () => {
    return ((mainItem === undefined) || mainItem.name === undefined || mainItem.name === "");
  }

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-base text-content-neutral-strong">quantos</p>
          <div className="flex gap-1.5">
            <p className="text-sm font-semibold text-content-neutral-weak">total</p>
            <p className="text-sm font-bold text-content-neutral-base">{formatBRL(total)}</p>
          </div>
        </div>
        <div>
          {
            isMainItemEmpty() || mainItem.quantity < 1 ? (
              <Button
                buttonColor="neutral-weak"
                buttonType="solid"
                disabled={isMainItemEmpty()}
                onClick={OnClick}
              >
                <p className="font-bold text-sm text-content-neutral-white">adicionar</p>
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                {mainItem.quantity > 1 ? (
                  <Image
                    className="w-[32px] h-auto cursor-pointer"
                    src={minus}
                    alt="click to reduce quantity of main dish"
                    onClick={() => ChangeQuantity(-1)}
                  />
                ) : (
                  <Image
                    className="w-[21px] h-auto cursor-pointer"
                    src={trash}
                    alt="click to delete main dish"
                    onClick={() => ChangeQuantity(-1)}
                  />
                )}
                <p className="font-bold text-base text-content-neutral-base">{mainItem.quantity}</p>
                <Image
                  className="w-[32px] h-auto cursor-pointer"
                  src={plus}
                  alt="click to add more of main dish"
                  onClick={() => ChangeQuantity(+1)}
                />
              </div>
            )
          }
        </div>
      </div>
      {
        mainItem.quantity >= 1 &&
        <Button buttonType="solid" buttonColor="primary" className="fixed bottom-4 left-1/10 w-[300px] md:left-1/8 sm:w-[342px]">
          <p className="text-base font-semibold text-content-neutral-white">ver ticket</p>
        </Button>
      }
    </>
  );
}