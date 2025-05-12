export type ChoosenProduct = {
  id: string,
  name: string,
  quantity: number,
  price: number,
  offPrice?: number,
}

export type ChoosenProducts = {
  id: string,
  category: string,
  products: ChoosenProduct[]
}

export type MainProduct = {
  id: string,
  category: string,
  name: string,
  price: number,
  realPrice: number,
  offPrice: number,
  quantity: number,
}

export type RestaurantData = {
  name: string,
  logo: string,
  description: string,
  restaurantName: string
}