import { getItem } from "@/lib/api/mock/restaurants";

interface IProductPage {
  id: string,
  productId: string
}

export default async function ProductPage({ params }: { params: IProductPage }) {
  const { id, productId } = await params;

  const item = await getItem(id, productId);
  console.log("item: ", item);

  if (Object.keys(item).length === 0) return <div>Empty state</div>

  return (
    <div>product page iihihi: {productId} e {id}</div>
  );
}