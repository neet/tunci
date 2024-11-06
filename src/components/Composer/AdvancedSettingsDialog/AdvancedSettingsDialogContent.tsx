"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FiX } from "react-icons/fi";

import { Button } from "@/components/Button";

import { DialectSelector } from "./DialectSelector";
import { PronounSelector } from "./PronounSelector";

export interface AdvancedSettingsDialogContentProps {
  defaultValues?: {
    pronoun?: string;
    dialect?: string;
  };
  onClose(): void;
}

export const AdvancedSettingsDialogContent: FC<
  AdvancedSettingsDialogContentProps
> = (props) => {
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
        <h2 tabIndex={0} className="font-bold text-lg">
          {t("advanced_settings")}
        </h2>

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

        <footer className="flex justify-end">
          <Button type="button" onClick={onClose}>
            {t("close")}
          </Button>
        </footer>
      </div>
    </div>
  );
};
