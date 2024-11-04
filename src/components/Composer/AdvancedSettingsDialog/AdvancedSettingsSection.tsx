import { FC, ReactNode } from "react";

export type AdvancedSettingsSectionProps = {
  legend: string;
  description: string;
  children: ReactNode;
};

export const AdvancedSettingsSection: FC<AdvancedSettingsSectionProps> = (
  props,
) => {
  const { legend, description, children } = props;

  return (
    <fieldset>
      <fieldset className="font-bold">{legend}</fieldset>

      <p className="mt-1 text-gray-800 dark:text-zinc-200">{description}</p>

      <div className="mt-3">{children}</div>
    </fieldset>
  );
};
