import { tv } from "tailwind-variants";

export const shared = tv({
  base: '',
  slots: {
    price: 'text-sm text-content-primary font-bold',
    label: 'text-sm text-content-neutral-weak',
    offPrice: 'text-xs text-content-neutral-weak',
    button: [
      'border-2 size-[24px] rounded-full',
      'flex justify-center items-center',
    ],
    sign: [
      'h-full',
      'leading-none'
    ]
  },
  variants: {
    variant: {
      enabled: {
        button: [
          'border-content-secondary-base',
          'bg-surface-background hover:bg-surface-middleground',
          'text-content-secondary-base'
        ]
      },
      disabled: {
        button: [
          'border-content-neutral-border',
          'bg-surface-foreground',
          'text-content-neutral-weakest'
        ]
      }
    }
  }
});