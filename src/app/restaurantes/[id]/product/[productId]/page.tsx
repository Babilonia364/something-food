import ProductClient from "@/app/components/ClientsWrapped/ProductClient";
import { Product } from "@/data/types/products";
import { getItem } from "@/lib/api/mock/restaurants";




interface IProductPage {
  id: string,
  productId: string
}

export default async function ProductPage({ params }: { params: IProductPage }) {
  const { id, productId } = await params;

  const items: Product = await getItem(id, productId);

  if (Object.keys(items).length === 0) return <div>Empty state</div>

  return (
    <div className="overflow-x-hidden">
      <ProductClient items={items} />
    </div>
  );
}