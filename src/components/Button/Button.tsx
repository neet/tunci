import clsx from "clsx";
import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<"button">> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <button
      className={clsx(
        "px-3 py-1.5 rounded-lg",
        "outline-blue-400 outline-2 focus:outline outline-offset-4",
        "transition",
        // light
        "bg-zinc-950 text-white",
        "hover:bg-zinc-700",
        "disabled:bg-zinc-600 disabled:hover:bg-zinc-500",
        // dark
        "dark:bg-zinc-50 dark:text-black",
        "dark:hover:bg-zinc-200",
        "dark:disabled:bg-zinc-300 dark:disabled:hover:bg-zinc-400",
        // contrast
        "forced-colors:border forced-colors:border-[ButtonBorder]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
