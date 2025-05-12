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
  minPrice: number,
  categories: Categories[]
}