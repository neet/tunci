import { Metadata } from "next";

import { Translator } from "@/components/Translator";

import { translate } from "./actions";

export const metadata: Metadata = {
  title: "tunci - アイヌ語と日本語を双方向に翻訳",
};

export default function Home() {
  return (
    <main className="grow w-full max-w-screen-xl mx-auto">
      <Translator action={translate} className="mt-4" />
    </main>
  );
}
