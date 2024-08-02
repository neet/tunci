import clsx from "clsx";
import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<"button">> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <button
      className={clsx(
        "bg-violet-500 text-white px-3 py-1.5 rounded-lg",
        "outline-violet-400 outline-2 focus:outline outline-offset-4",
        "hover:bg-violet-600",
        "disabled:opacity-70 disabled:hover:bg-violet-500",
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
