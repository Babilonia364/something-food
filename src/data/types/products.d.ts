export type Additional = {
  id: string;
  label: string;
  price?: number;
  isAdditional?: boolean;
  offPrice?: number;
}

export type Categories = {
  id: string,
  isMandatory?: boolean,
  hasLimit?: boolean,
  category: string,
  limit: number,
  mainCategory?: boolean,
  additionals: Additional[]
}

export type Product = {
  id: string,
  logo: string,
  restaurantName: string,
  minPrice: number,
  image: string,
  name: string,
  description: string,
  categories: Categories[]
}