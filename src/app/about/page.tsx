import clsx from "clsx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて",
  description:
    "このサイトは、アイヌ語↔日本語の双方向翻訳を行うWebアプリです。現在、アイヌ語学習者に向けて試験的に公開しています。",
};

export default function AboutPage() {
  return (
    <article
      className={clsx(
        "bg-white dark:bg-black",
        "p-4 rounded mx-auto",
        "prose prose-zinc prose-a:text-blue-600 prose-a:font-normal dark:prose-invert dark:prose-a:text-blue-400",
      )}
    >
      <h2>このサイトについて</h2>

      <p>
        <ruby>
          tunci<rt>トゥンチ</rt>
        </ruby>
        は、アイヌ語↔日本語の双方向翻訳を行うWebアプリです。現在、アイヌ語学習者に向けて試験的に公開しています。
      </p>

      <p>
        当然ながら、誤った翻訳を生成することがあります。アイヌ語初学者の方は、
        <strong>結果を鵜呑みにせず、かならず講師や上級者に確認</strong>
        してください。
      </p>

      <p>
        このWebサイトのソースコードは、
        <a href="https://github.com/neet/tunci" target="_blank">
          GitHub
        </a>
        で公開されています。自然言語処理のためのモデルは
        <a href="https://huggingface.co/aynumosir" target="_blank">
          Hugging Face Hub
        </a>
        に公開しています。
      </p>

      <p>
        作者に連絡したい場合は、Xを使ってください。
        <a href="https://x.com/TheGodOfNeet" target="_blank">
          @TheGodOfNeet
        </a>
      </p>

      <h3>スコア</h3>
      <p>
        2024年7月時点で、アイヌ語↔日本語の翻訳において以下のBLEUスコアを達成しています。
      </p>

      <table>
        <thead>
          <tr>
            <th>翻訳元</th>
            <th>翻訳先</th>
            <th>BLEUスコア</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>日本語</td>
            <td>アイヌ語</td>
            <td>37.02</td>
          </tr>

          <tr>
            <td>アイヌ語</td>
            <td>日本語</td>
            <td>20.41</td>
          </tr>
        </tbody>
      </table>

      <h3>参考資料</h3>

      <ul>
        <li>
          <a href="https://ainu.ninjal.ac.jp/topic/" target="_blank">
            国立国語研究所『トピック別アイヌ語会話辞典』
          </a>
        </li>

        <li>
          <a href="https://ainu.ninjal.ac.jp/folklore/" target="_blank">
            中川裕、アンナ・ブガエワ、小林美紀、吉川佳見（2016-2024）『アイヌ語口承文芸コーパス―音声・グロス付き―』．国立国語研究所
          </a>
        </li>
      </ul>
    </article>
  );
}
