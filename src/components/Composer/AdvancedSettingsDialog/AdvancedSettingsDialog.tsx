import { Dialog } from "@radix-ui/themes";
import { FC, ReactNode, useRef } from "react";

import { AdvancedSettingsDialogContent } from "./AdvancedSettingsDialogContent";
import { AdvancedSettings } from "./models";

export type AdvancedSettingsDialogProps = {
  opener: ReactNode;
  defaultValues: AdvancedSettings;
  onClose?: (values: Partial<AdvancedSettings>) => void;
};

export const AdvancedSettingsDialog: FC<AdvancedSettingsDialogProps> = (
  props,
) => {
  const { defaultValues, onClose } = props;

  const ref = useRef<HTMLDivElement>(null);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      return;
    }

    const form = ref.current?.querySelector("form");

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const fd = new FormData(form);

    onClose?.({
      pronoun: fd.get("pronoun") as string,
      dialect: fd.get("dialect") as string,
    });
  };

  return (
    <Dialog.Root onOpenChange={handleOpenChange}>
      <Dialog.Trigger>{props.opener}</Dialog.Trigger>

      <Dialog.Content ref={ref}>
        <form>
          <AdvancedSettingsDialogContent defaultValues={defaultValues} />
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
