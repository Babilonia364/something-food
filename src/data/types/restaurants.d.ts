interface OpeningHours {
  is24h: boolean;
  timezone: string;
  opensAt?: string; // Format HH:MM
  closesAt?: string; // Format HH:MM
}

export type Client = {
  id: string,
  logo: string,
  name: string,
  deliveryPrice: number,
  rating: number,
  openingHours: OpeningHours,
};