import clsx from "clsx";
import { ComponentProps, FC, ReactNode } from "react";

export type SelectProps = ComponentProps<"select"> & {
  label: string;
  children: ReactNode;
};

export const Select: FC<SelectProps> = (props) => {
  const { children, label, ...rest } = props;

  return (
    <label
      className={clsx(
        "flex items-center",
        "bg-white h-full border border-zinc-300 dark:bg-black dark:border-zinc-700 rounded-md"
      )}
    >
      <span className="text-xs block text-zinc-700 dark:text-zinc-300 pl-2">
        {label}
      </span>

      <select
        className={clsx(
          "text-end p-2 pl-0 cursor-pointer",
          "outline-blue-400 outline-2 group-focus:outline outline-offset-4 cursor-pointer",
          "bg-transparent"
        )}
        {...rest}
      >
        {children}
      </select>
    </label>
  );
};
