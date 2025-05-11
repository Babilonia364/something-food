type ProductVariant = {
  id: string;
  name: string;
  price: number;
  offPrice?: number;
  description?: string;
  startingPrice?: boolean;
};

export type ProductItem = {
  id: string;
  name: string;
  hasSomeOffProduct?: boolean;
  description?: string;
  icon?: React.ReactNode;
  variants: ProductVariant[];
};

export type DetailsType = {
  id: string,
  name: string,
  logo: string,
  price: number,
  estimatedTimeMin: string,
  distance: string,
  freeDeliveryPrice: number,
  closeAt: string,
  minOrder: number,
  rating: number,
  products: ProductItem[],
};