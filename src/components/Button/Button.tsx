import clsx from "clsx";
import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<"button">> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <button
      className={clsx(
        "bg-blue-500 text-white px-3 py-2 rounded-md outline-blue-400 outline-2 focus:outline outline-offset-4",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
