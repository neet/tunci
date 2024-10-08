"use client";

import clsx from "clsx";
import { ComponentProps, FC, ReactNode, useId } from "react";

export type SelectProps = ComponentProps<"select"> & {
  label: string;
  children: ReactNode;
};

export const Select: FC<SelectProps> = (props) => {
  const { children, label, className, ...rest } = props;

  const selectId = useId();

  return (
    <div
      className={clsx(
        "flex items-center",
        // "rounded-lg",
        "bg-white h-full",
        "dark:bg-black dark:border-zinc-600",
      )}
    >
      <div
        className={clsx(
          "px-2.5 py-1.5",
          "bg-zinc-100 text-zinc-500 border border-zinc-300",
          "rounded-lg rounded-r-none",
          "dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-600",
        )}
      >
        <label htmlFor={selectId}>{label}</label>
      </div>

      <select
        id={selectId}
        className={clsx(
          "px-2.5 py-1.5",
          "rounded-lg rounded-l-none",
          "text-end",
          "border border-l-0 border-zinc-300",
          "dark:border-zinc-600",
          "focus:outline outline-blue-400 outline-2 outline-offset-4",
          "appearance-none bg-transparent",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
};
