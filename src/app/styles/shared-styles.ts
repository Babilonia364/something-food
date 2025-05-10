import { tv } from "tailwind-variants";

export const shared = tv({
  base: '',
  slots: {
    price: 'text-sm text-content-primary font-bold',
    label: 'text-sm text-content-neutral-weak',
    offPrice: 'text-xs text-content-neutral-weak',
  }
});