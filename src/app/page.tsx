import { translate } from "./actions";
import { Translator } from "@/components/Translator/Translator";

export default function Home() {
  return (
    <main className="grow w-full max-w-screen-xl mx-auto">
      <h1 className="font-serif text-4xl leading-relaxed mt-4">tunci</h1>

      <Translator action={translate} className="mt-4" />

      <section className="mt-4 bg-yellow-50 dark:bg-yellow-950 border rounded border-yellow-500 text-yellow-800 dark:text-yellow-200 py-2 px-3">
        <details open>
          <summary className="leading-snug font-bold my-2">
            利用上の注意
          </summary>
          <p className="leading-relaxed mt-2">
            これはアイヌ語と日本語の双方向翻訳アプリです。現在、サービスを試験的に提供しています。
            <br />
            当然ながら、間違った翻訳をすることがあります。アイヌ語を学習したことがない人は結果を鵜呑みにせず、かならず講師や上級者に確認してください。
            <br />
            また、リンクの共有は限定的にお願いします。
          </p>
          <p className="leading-relaxed mt-2">
            バグ報告・要望・アドバイスなど：
            <a
              href="https://x.com/TheGodOfNeet"
              className="underline"
              target="_blank"
            >
              @TheGodOfNeet
            </a>
          </p>

          <h3 className="leading-relaxed mt-2 font-bold">
            参考資料
          </h3>

          <ul className="list-disc list-inside">
            <li>
              アイヌ民族博物館『アイヌ語アーカイブ』（
              <a
                className="underline"
                href="https://ainugo.nam.go.jp/pages/guide.html"
              >
                https://ainugo.nam.go.jp/pages/guide.html
              </a>
              ）
            </li>
            <li>
              国立国語研究所『トピック別アイヌ語会話辞典』（
              <a
                className="underline"
                href="https://ainu.ninjal.ac.jp/topic/"
              >
                https://ainu.ninjal.ac.jp/topic/
              </a>
              ）
            </li>
            <li>
              中川裕、アンナ・ブガエワ、小林美紀、吉川佳見（2016-2024）『アイヌ語口承文芸コーパス―音声・グロス付き―』．国立国語研研究所（
              <a
                className="underline"
                href="https://ainu.ninjal.ac.jp/folklore/"
              >
                https://ainu.ninjal.ac.jp/folklore/
              </a>
              ）
            </li>
          </ul>
        </details>
      </section>
    </main>
  );
}
