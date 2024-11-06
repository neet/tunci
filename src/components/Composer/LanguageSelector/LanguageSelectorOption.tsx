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
        "py-1.5 px-3 rounded-lg border",
        "hover:bg-gray-100 dark:hover:bg-zinc-900 transition",
        "border-gray-300 has-[input:checked]:bg-indigo-50 has-[input:checked]:border-indigo-600",
        "dark:border-zinc-600 dark:has-[input:checked]:bg-indigo-950 dark:has-[input:checked]:border-indigo-400",
        "outline-indigo-400 outline-2 focus-within:outline outline-offset-4",
        "forced-colors:border-[ButtonBorder] forced-colors:bg-[ButtonFace] forced-colors:text-[ButtonText] forced-colors:has-[input:checked]:bg-[Highlight]",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        className="peer sr-only focus:outline-none accent-indigo-500"
        onChange={onChange}
      />

      <span
        className={clsx(
          "text-gray-600 dark:text-zinc-400",
          "peer-checked:text-indigo-600 dark:peer-checked:text-indigo-400",
          "peer-checked:forced-colors:text-[HighlightText] peer-checked:forced-colors:bg-[Highlight]",
        )}
      >
        {children}
      </span>
    </label>
  );
};
