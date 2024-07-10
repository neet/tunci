import { useFormStatus } from "react-dom";

import { Button } from "../Button";

export const TranslatorSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      翻訳する
    </Button>
  );
};
