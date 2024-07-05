import { translate } from "./actions";
import { Translator } from "@/components/Translator/Translator";

export default function Home() {
  return (
    <main className="grow w-full max-w-screen-xl mx-auto">
      <h1 className="font-serif text-4xl leading-relaxed mt-4">tunci</h1>

      <p className="mt-2 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        これはアイヌ語と日本語の双方向翻訳アプリです。現在、サービスを試験的に提供しています。
        <br />
        間違った翻訳をすることがあります。アイヌ語を学習したことがない人は鵜呑みにせず、かならず講師や上級者に確認してください。
      </p>

      <Translator action={translate} className="mt-4" />
    </main>
  );
}
