import { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて - tunci",
  description:
    "このサイトは、アイヌ語↔日本語の双方向翻訳を行うWebアプリです。現在、アイヌ語学習者に向けて試験的に公開しています。",
};

export default function AboutPage() {
  return (
    <article className="bg-white dark:bg-black p-4 rounded mx-auto prose prose-a:text-blue-500">
      <h2>
        このサイトについて
      </h2>

      <p>
        このサイトは、アイヌ語↔日本語の双方向翻訳を行うWebアプリです。現在、アイヌ語学習者に向けて試験的に公開しています。
      </p>

      <p>
        当然ながら、誤った翻訳を生成することがあります。アイヌ語初学者の方は、
        <em>
          結果を鵜呑みにせず、かならず講師や上級者に確認
        </em>
        してください。
      </p>

      <p>
        このWebサイトのソースコードは、
        <a
          href="https://github.com/neet/tunci"
          target="_blank"
        >
          GitHub
        </a>
        で公開されています。自然言語処理のためのモデルは
        <a
          href="https://huggingface.co/aynumosir"
          target="_blank"
        >
          Hugging Face Hub
        </a>
        に公開しています。
      </p>

      <p>
        作者に連絡したい場合は、Xを使ってください。
        <a
          href="https://x.com/TheGodOfNeet"
          target="_blank"
        >
          @TheGodOfNeet
        </a>
      </p>

      <h3>スコア</h3>
      <p>
        2024年7月時点で、アイヌ語↔日本語の翻訳において以下のBLEUスコアを達成しています。
      </p>
      <dl>
        <dt>日本語→アイヌ語</dt>
        <dd>35.57</dd>

        <dt>アイヌ語→日本語</dt>
        <dd>16.27</dd>
      </dl>

      <h3>参考資料</h3>

      <ul>
        <li>
          国立国語研究所『トピック別アイヌ語会話辞典』（
          <a
            href="https://ainu.ninjal.ac.jp/topic/"
            target="_blank"
          >
            https://ainu.ninjal.ac.jp/topic/
          </a>
          ）
        </li>

        <li>
          中川裕、アンナ・ブガエワ、小林美紀、吉川佳見（2016-2024）『アイヌ語口承文芸コーパス―音声・グロス付き―』．国立国語研究所（
          <a
            href="https://ainu.ninjal.ac.jp/folklore/"
            target="_blank"
          >
            https://ainu.ninjal.ac.jp/folklore/
          </a>
          ）
        </li>
      </ul>
    </article>
  );
}
