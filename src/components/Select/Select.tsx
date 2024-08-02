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
        "rounded-lg overflow-hidden",
        "bg-white h-full border border-zinc-300",
        "dark:bg-black dark:border-zinc-600",
        "focus-within:outline outline-blue-400 outline-2 outline-offset-4",
      )}
    >
      <div
        className={clsx(
          "px-2.5 py-1.5",
          "bg-zinc-100 text-zinc-500 border-r border-zinc-300",
          "dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-600",
        )}
      >
        <label htmlFor={selectId}>{label}</label>
      </div>

      <select
        id={selectId}
        className={clsx(
          "px-2.5 py-1.5",
          "text-end",
          "focus:outline-none",
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
