"use client";

import clsx from "clsx";
import { ComponentProps, FC, ReactNode, useId } from "react";

export type SelectProps = ComponentProps<"select"> & {
  label: string;
  children: ReactNode;
};

export const Select: FC<SelectProps> = (props) => {
  const { children, label, ...rest } = props;

  const selectId = useId();

  return (
    <div
      className={clsx(
        "flex items-center",
        "focus-within:outline outline-blue-400 outline-2 outline-offset-4 cursor-pointer",
        "bg-white h-full border border-zinc-300 dark:bg-black dark:border-zinc-700 rounded-md",
      )}
    >
      <label
        className="text-xs block text-zinc-700 dark:text-zinc-300 pl-2 mr-2"
        htmlFor={selectId}
      >
        {label}
      </label>

      <select
        id={selectId}
        className={clsx(
          "text-end p-2 pl-0 cursor-pointer",
          "focus:outline-none",
          "appearance-none bg-transparent",
        )}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
};
