import clsx from "clsx";
import { ComponentProps, FC } from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: [
    "px-3 py-1.5 rounded-lg",
    "outline-indigo-400 outline-2 focus:outline outline-offset-4",
    "transition",
  ],
  variants: {
    variant: {
      primary: [
        // light
        "bg-indigo-600 text-white",
        "hover:bg-indigo-700",
        "disabled:bg-indigo-400 disabled:hover:bg-indigo-500",
        // dark
        "dark:bg-indigo-400 dark:text-black",
        "dark:hover:bg-indigo-500",
        "dark:disabled:bg-indigo-300 dark:disabled:hover:bg-indigo-400",
        // contrast
        "forced-colors:border forced-colors:border-[ButtonBorder]",
      ],

      secondary: [
        "border",
        // light
        "border-indigo-600 text-indigo-600",
        "hover:bg-indigo-100",
        // "disabled:bg-indigo-200 disabled:hover:bg-indigo-300",
        // dark
        "dark:border-indigo-400 dark:text-indigo-400",
        "dark:hover:bg-indigo-900",
        // "dark:disabled:bg-indigo-800 dark:disabled:hover:bg-indigo-700",
        // contrast
        "forced-colors:border forced-colors:border-[ButtonBorder]",
      ],
    },
    size: {
      md: "",
      lg: "text-lg",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: "lg";
};

export const Button: FC<ButtonProps> = (props) => {
  const { children, className, size, variant, ...rest } = props;

  return (
    <button className={clsx(button({ size, variant }), className)} {...rest}>
      {children}
    </button>
  );
};
