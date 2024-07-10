import clsx from "clsx";
import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<"button">> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <button
      className={clsx(
        "bg-blue-500 text-white px-3 py-2 rounded-md",
        "outline-blue-400 outline-2 focus:outline outline-offset-4",
        "hover:bg-blue-600",
        "disabled:opacity-70 disabled:cursor-not-allowed",
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
