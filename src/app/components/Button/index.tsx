import { tv, VariantProps } from "tailwind-variants";
import React, { ComponentType, ReactNode, SVGProps } from "react";

// Define button variants
const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2",
  variants: {
    buttonColor: {
      primary: "",
      secondary: "",
      success: "",
      "neutral-base": "",
      "neutral-weak": "",
      "neutral-background": "",
      "neutral-middleground": "",
      "neutral-foreground": "",
    },
    buttonType: {
      solid: "",
      ghost: "bg-transparent hover:bg-opacity-10",
    },
  },
  compoundVariants: [
    // Solid variants
    {
      buttonColor: "primary",
      buttonType: "solid",
      class: "bg-surface-primary text-white hover:bg-surface-primary/90 focus:ring-surface-primary",
    },
    {
      buttonColor: "secondary",
      buttonType: "solid",
      class: "bg-surface-neutral-base text-white hover:bg-surface-neutral-base/90 focus:ring-surface-neutral-base",
    },
    {
      buttonColor: "success",
      buttonType: "solid",
      class: "bg-surface-neutral-base text-white hover:bg-surface-neutral-base/90 focus:ring-surface-neutral-base",
    },
    {
      buttonColor: "neutral-base",
      buttonType: "solid",
      class: "bg-surface-neutral-base text-white hover:bg-surface-neutral-base/90 focus:ring-surface-neutral-base",
    },
    {
      buttonColor: "neutral-weak",
      buttonType: "solid",
      class: "bg-surface-neutral-weak text-white hover:bg-surface-neutral-weak/90 focus:ring-surface-neutral-weak",
    },
    {
      buttonColor: "neutral-background",
      buttonType: "solid",
      class: "bg-surface-background text-content-neutral-strong border border-surface-neutral-border hover:bg-surface-middleground focus:ring-surface-neutral-border",
    },
    {
      buttonColor: "neutral-middleground",
      buttonType: "solid",
      class: "bg-surface-middleground text-content-neutral-strong hover:bg-surface-foreground focus:ring-surface-neutral-border",
    },
    {
      buttonColor: "neutral-foreground",
      buttonType: "solid",
      class: "bg-surface-foreground text-content-neutral-strong hover:bg-surface-middleground focus:ring-surface-neutral-border",
    },

    // Ghost variants
    {
      buttonColor: "primary",
      buttonType: "ghost",
      class: "text-content-primary hover:bg-surface-primary/10 focus:ring-surface-primary",
    },
    {
      buttonColor: "secondary",
      buttonType: "ghost",
      class: "text-content-neutral-base hover:bg-surface-neutral-base/10 focus:ring-surface-neutral-base",
    },
    {
      buttonColor: "success",
      buttonType: "ghost",
      class: "text-content-secondary-base hover:bg-surface-neutral-base/10 focus:ring-surface-success",
    },
    {
      buttonColor: "neutral-base",
      buttonType: "ghost",
      class: "text-content-neutral-weak hover:bg-surface-neutral-weak/10 focus:ring-surface-neutral-weak",
    },
    {
      buttonColor: "neutral-weak",
      buttonType: "ghost",
      class: "text-content-neutral-weak hover:bg-surface-neutral-weak/10 focus:ring-surface-neutral-weak",
    },
  ],
  defaultVariants: {
    buttonColor: "primary",
    buttonType: "solid",
  },
});

// Define props (supports both ComponentType and JSX)
type ButtonProps = VariantProps<typeof buttonVariants> & {
  children: ReactNode;
  icon?: ReactNode | ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  buttonColor,
  buttonType,
  icon: Icon,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ buttonColor, buttonType, className })}
      {...props}
    >
      {/* Render icon (either JSX or component) */}
      {Icon && (
        <span className="inline-flex h-4 w-4 items-center justify-center">
          {typeof Icon === "function" ? <Icon className="h-full w-full" /> : Icon}
        </span>
      )}
      {children}
    </button>
  );
};