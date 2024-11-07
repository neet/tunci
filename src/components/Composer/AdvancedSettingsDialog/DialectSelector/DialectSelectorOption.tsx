import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { IoFlask } from "react-icons/io5";

type DialectSelectorOptionProps = {
  children: React.ReactNode;
  value: string;
  checked?: boolean;
  experimental?: boolean;
  onChange?(value: string): void;
};

export const DialectSelectorOption: FC<DialectSelectorOptionProps> = (
  props,
) => {
  const { value, checked, children, experimental, onChange } = props;

  const t = useTranslations("components.Composer.DialectSelector");

  return (
    <label
      className={clsx(
        "flex items-center px-2 py-2.5 md:p-2",
        "hover:bg-gray-100 dark:hover:bg-zinc-900 transition",
      )}
    >
      <input
        value={value}
        checked={checked}
        type="radio"
        name="dialect"
        className="peer accent-indigo-600 dark:accent-indigo-400"
        onChange={(e) => onChange?.(e.target.value)}
      />

      <div className="ml-2 peer-checked:text-indigo-600 dark:peer-checked:text-indigo-400 md:text-sm">
        {children}
      </div>

      {experimental && (
        <IoFlask
          className="ml-auto size-4 text-gray-400 dark:text-zinc-600"
          title={t("experimental")}
        />
      )}
    </label>
  );
};
