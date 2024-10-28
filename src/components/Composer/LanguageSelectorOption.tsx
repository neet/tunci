import clsx from "clsx";
import { ChangeEventHandler, FC, ReactNode } from "react";

export type LanguageSelectorOptionProps = {
  name: string;
  value: string;
  checked: boolean;
  defaultChecked?: boolean;
  children: ReactNode;
  onChange: ChangeEventHandler;
};

export const LanguageSelectorOption: FC<LanguageSelectorOptionProps> = (
  props,
) => {
  const { name, value, checked, defaultChecked, children, onChange } = props;

  return (
    <label
      className={clsx(
        "py-1.5 px-3 rounded-lg",
        checked
          ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400"
          : "bg-gray-100 text-gray-600 dark:bg-zinc-900 dark:text-zinc-400",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        className="peer sr-only focus-visible:mr-2 focus-visible:not-sr-only accent-indigo-500"
        onChange={onChange}
      />

      {children}
    </label>
  );
};
