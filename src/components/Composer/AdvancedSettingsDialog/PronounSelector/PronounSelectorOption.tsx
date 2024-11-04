import clsx from "clsx";
import { FC } from "react";

export type PronounSelectorOptionProps = {
  title: string;
  description: string;
  value: string;
  defaultChecked: boolean;
  className?: string;
};

export const PronounSelectorOption: FC<PronounSelectorOptionProps> = (
  props,
) => {
  const { title, description, value, defaultChecked, className } = props;

  return (
    <label
      className={clsx(
        "flex gap-3 items-center",
        "border rounded py-2 px-3",
        "text-sm",
        "border-gray-300 has-[input:checked]:bg-indigo-50 has-[input:checked]:border-indigo-600",
        "dark:border-zinc-600 dark:has-[input:checked]:bg-indigo-950 dark:has-[input:checked]:border-indigo-400",
        className,
      )}
    >
      <input
        name="pronoun"
        value={value}
        type="radio"
        defaultChecked={defaultChecked}
        className="peer accent-indigo-600 dark:accent-indigo-400"
      />

      <div className="peer-checked:text-indigo-600 dark:peer-checked:text-indigo-400">
        <h4 className="font-bold">{title}</h4>
        <p className="text-gray-600 dark:text-zinc-400">{description}</p>
      </div>
    </label>
  );
};
