interface IRestaurantPage {
  id: string
}

export default async function RestaurantPage({params}: {params: IRestaurantPage}) {
  const { id } = params;

  console.log("params: ", params);

  return (
    <div>id: {id}</div>
  );
}