import Image from "next/image"
import ghost from "@/app/assets/ghost.svg";
import location from "@/app/assets/location.svg";
import person from "@/app/assets/person.svg";

export const Header = () => {
  return (
    <nav className="flex flex-col bg-content-primary h-[90px] justify-center">
      <div className="flex px-5 gap-3">
        <div className="flex justify-between w-17">
          <Image src={ghost} alt="" className="w-[32px] h-auto" />
          <Image src={location} alt="" className="w-[13px] h-auto" />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-sm text-content-primary-weakest">entregando em</p>
          <p className="font-bold text-base text-content-neutral-white">Rua Mandaguari, 198</p>
        </div>
        <div className="flex flex-grow justify-end">
          <Image src={person} alt="" className="w-[16px] h-auto" />
        </div>
      </div>
    </nav>
  );
}