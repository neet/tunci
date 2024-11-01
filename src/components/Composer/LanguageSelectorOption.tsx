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
        "forced-colors:border forced-colors:border-[ButtonBorder] forced-colors:bg-[ButtonFace] forced-colors:text-[ButtonText]",
        "bg-gray-100 text-gray-600 dark:bg-zinc-900 dark:text-zinc-400",
        "has-[input:checked]:bg-indigo-100 has-[input:checked]:text-indigo-600 has-[input:checked]:dark:bg-indigo-950 has-[input:checked]:dark:text-indigo-400 has-[input:checked]:forced-colors:bg-[Highlight]",
        "outline-indigo-400 outline-2 focus-within:outline outline-offset-4",
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
          "peer-checked:forced-colors:text-[HighlightText] peer-checked:forced-colors:bg-[Highlight]",
        )}
      >
        {children}
      </span>
    </label>
  );
};
