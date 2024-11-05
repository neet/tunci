import clsx from "clsx";
import { forwardRef, ForwardRefRenderFunction } from "react";

import { AdvancedSettingsDialogContent } from "./AdvancedSettingsDialogContent";

export type AdvancedSettingsDialogProps = {
  defaultValues?: {
    pronoun?: string;
    dialect?: string;
  };
  onClose(): void;
};

const AdvancedSettingsDialogRenderFn: ForwardRefRenderFunction<
  HTMLDialogElement,
  AdvancedSettingsDialogProps
> = (props, ref) => {
  const { defaultValues = {}, onClose } = props;

  return (
    <dialog
      className={clsx(
        "w-full max-w-screen-sm backdrop:bg-black/70 backdrop:backdrop-blur rounded-lg",
        "shadow-lg bg-white",
        "dark:border dark:border-zinc-600 dark:bg-black",
        "forced-colors:border forced-colors:border-[ButtonBorder]",
      )}
      ref={ref}
    >
      <AdvancedSettingsDialogContent
        defaultValues={{
          pronoun: defaultValues.pronoun,
          dialect: defaultValues.dialect,
        }}
        onClose={onClose}
      />
    </dialog>
  );
};

export const AdvancedSettingsDialog = forwardRef(
  AdvancedSettingsDialogRenderFn,
);
