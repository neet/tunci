import { SegmentedControl, VisuallyHidden } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC, ReactNode, useId } from "react";

type LanguageSelectorProps = {
  form?: string;
  name: string;
  value: string;
  legend: ReactNode;
  className?: string;
  onChange: (value: string) => void;
};

export const LanguageSelector: FC<LanguageSelectorProps> = (props) => {
  const { form, name, value, legend, onChange } = props;

  const id = useId();
  const t = useTranslations("components.Composer.LanguageSelector");

  return (
    <>
      <VisuallyHidden>
        <div id={id}>{legend}</div>
      </VisuallyHidden>

      <SegmentedControl.Root
        value={value}
        aria-describedby={id}
        onValueChange={onChange}
      >
        <SegmentedControl.Item value="ja">
          {t("japanese")}
        </SegmentedControl.Item>
        <SegmentedControl.Item value="ain">{t("ainu")}</SegmentedControl.Item>
      </SegmentedControl.Root>

      <input type="hidden" form={form} name={name} value={value} />
    </>
  );
};
