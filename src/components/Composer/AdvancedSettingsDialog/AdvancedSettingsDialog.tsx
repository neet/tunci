"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FiX } from "react-icons/fi";

import { DialectSelector } from "./DialectSelector/DialectSelector";
import { PronounSelector } from "./PronounSelector";

export interface AdvancedSettingsDialogProps {
  defaultValues?: {
    pronoun?: string;
    dialect?: string;
  };
  onClose(): void;
}

export const AdvancedSettingsDialog: FC<AdvancedSettingsDialogProps> = (
  props,
) => {
  const { defaultValues, onClose } = props;

  const t = useTranslations("components.Composer");

  return (
    <div className="w-full relative text-black dark:text-white">
      <header
        className={clsx(
          "sticky top-0 left-0",
          "flex justify-between",
          "p-4",
          "shadow-sm bg-white/80 backdrop-blur",
          "dark:border-b dark:border-zinc-600 dark:bg-black/80",
        )}
      >
        <h2 className="font-bold text-lg">{t("advanced_settings")}</h2>

        <button
          type="button"
          className={clsx(
            "rounded-full",
            "hover:bg-gray-200",
            "dark:hover:bg-zinc-700",
            "focus:outline outline-2 outline-indigo-500",
          )}
          onClick={onClose}
        >
          <FiX
            aria-label={t("close")}
            className="size-6 text-gray-400 dark:text-zinc-600"
          />
        </button>
      </header>

      <div className="space-y-8 p-4">
        <PronounSelector defaultValue={defaultValues?.pronoun} />
        <DialectSelector defaultValue={defaultValues?.dialect} />
      </div>
    </div>
  );
};
