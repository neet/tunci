import clsx from "clsx";
import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<"button">> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <button
      className={clsx(
        "text-white px-3 py-1.5 rounded-lg",
        "outline-blue-400 outline-2 focus:outline outline-offset-4",
        "disabled:opacity-70 disabled:hover:bg-blue-500",
        "bg-blue-600 hover:bg-blue-700",
        "contrast-more:bg-blue-700 contrast-more:hover:bg-blue-800",
        "forced-colors:border forced-colors:border-[ButtonBorder]",
        "transition",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
