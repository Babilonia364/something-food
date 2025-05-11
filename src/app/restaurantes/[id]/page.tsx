import { Accordion } from "@/app/components/Accordion";
import { Details } from "@/app/components/Details";
import { LogoCard } from "@/app/components/LogoCard";
import { DetailsType, ProductItem } from "@/data/types/details";
import { getDetails } from "@/lib/api/mock/restaurants";

interface IRestaurantPage {
  id: string
}

export default async function RestaurantPage({ params }: { params: IRestaurantPage }) {
  const { id } = await params; // This await seems to have no effect but is being used to remove a warning from next

  const details: DetailsType = await getDetails(id);
  const products: ProductItem[] = details.products;

  if (Object.keys(details).length === 0) return <div>Empty state</div>

  return (
    <div className="flex flex-col py-6">
      <div className="flex flex-col gap-3 px-4">
        <LogoCard name={details.name} logo={details.logo} />
        <Details item={details} />
      </div>
      <Accordion
        items={products}
        collapsible
      />
    </div>
  );
}