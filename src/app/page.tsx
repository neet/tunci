import { translate } from "./actions";
import { Translator } from "@/components/Translator/Translator";

export default function Home() {
  return (
    <main className="grow w-full max-w-screen-xl mx-auto">
      <h2 className="font-serif text-4xl leading-relaxed mt-4">tunci</h2>

      <p className="mt-2 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        アイヌ語と日本語の双方向翻訳アプリです。現在、サービスを試験的に提供しています。
        <br />
        <span className="text-red-600 dark:text-red-400 font-bold">
          誤った翻訳を生成する可能性があります。
        </span>
        アイヌ語を学習したことがない方は鵜呑みにせず、かならず講師や上級者に確認してください。
      </p>

      <Translator action={translate} />
    </main>
  );
}
