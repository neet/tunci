import clsx from "clsx";
import { ComponentProps, FC } from "react";

export type ButtonProps = ComponentProps<"button"> & {
  size?: "lg";
};

export const Button: FC<ButtonProps> = (props) => {
  const { children, className, size, ...rest } = props;

  return (
    <button
      className={clsx(
        "px-3 py-1.5 rounded-lg",
        "outline-indigo-400 outline-2 focus:outline outline-offset-4",
        "transition",
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
        // size
        size === "lg" && "text-lg",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
