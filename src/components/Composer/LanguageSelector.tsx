import { SegmentedControl } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";

type LanguageSelectorProps = {
  form?: string;
  name: string;
  value: string;
  legend: ReactNode;
  className?: string;
  onChange: (value: string) => void;
};

export const LanguageSelector: FC<LanguageSelectorProps> = (props) => {
  const { form, name, value, onChange } = props;

  const t = useTranslations("components.Composer.LanguageSelector");

  return (
    <>
      <SegmentedControl.Root value={value} onValueChange={onChange}>
        <SegmentedControl.Item value="ja">
          {t("japanese")}
        </SegmentedControl.Item>
        <SegmentedControl.Item value="ain">{t("ainu")}</SegmentedControl.Item>
      </SegmentedControl.Root>

      <input type="hidden" form={form} name={name} value={value} />
    </>
  );
};
