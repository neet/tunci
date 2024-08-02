import { Link } from "@/navigation";

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto">
      <header className="text-center">
        <h1 className="text-5xl font-bold">アイヌ語で話そう</h1>
        <p className="leading-relaxed text-lg mt-3">
          tunciはアイヌ語と日本語を双方向に翻訳できるWebアプリです。
        </p>

        <p className="leading-relaxed text-lg mt-1">
          <Link href="/translate" className="text-blue-500 underline">
            今すぐ試す
          </Link>
        </p>
      </header>

      <div
        role="image"
        aria-label="tunciを用いて翻訳を行うイメージ"
        className="flex gap-4 justify-center mt-8"
      >
        <div className="w-96 py-4 px-6 bg-white text-zinc-950 rounded-lg border border-zinc-300 shadow-lg">
          <div className="text-zinc-500">日本語</div>
          <p className="mt-1 text-2xl">
            こんにちは。 <br />
            あなたの名前は何ですか？
          </p>
        </div>

        <div className="w-96 p-4 bg-zinc-50 text-zinc-950 rounded-lg border border-zinc-300 shadow-lg">
          <div className="text-zinc-500">アイヌ語</div>
          <p className="mt-1 text-2xl">
            irankarapte.
            <br />
            e=rehe makanak an?
          </p>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-center text-lg text-zinc-500">背景</h2>

        <p className="max-w-screen-sm text-center mx-auto">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
          <br />
          またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-lg text-zinc-500">特徴</h2>

        <div className="flex gap-4">
          <section className="p-6 bg-white border border-zinc-300 rounded-lg">
            <h3 className="text-2xl font-bold">言葉遣い</h3>

            <p className="mt-2">
              アイヌ語は、日常会話のときや、物語を語るとき、祈りを捧げるときなどで言葉遣いが大きく異なります。
            </p>
            <p className="mt-1">
              tunciを使えば、場面に応じた適切な言葉遣いで翻訳できます。
            </p>
          </section>

          <section className="p-6 bg-white border border-zinc-300 rounded-lg">
            <h3 className="text-2xl font-bold">方言</h3>

            <p className="mt-2">
              アイヌ語にはいわゆる「標準語」のようなものはなく、各地方ごとに特色のある言葉遣いをします。
            </p>
            <p className="mt-1">
              tunciでは、沙流・千歳・静内を始めとする多くの方言で翻訳できます。
            </p>
          </section>

          <section className="p-6 bg-white border border-zinc-300 rounded-lg">
            <h3 className="text-2xl font-bold">使いやすいUI</h3>

            <p className="mt-2">
              tunciは使いやすく、ミニマルなインターフェイスを標榜しています。
            </p>
            <p className="mt-1">
              モバイルデバイス、低速なインターネット環境、スクリーンリーダーでも問題なく使えます。
            </p>
          </section>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-lg text-zinc-500">性能</h2>

        <div className="flex gap-4">
          <div className="flex-1 bg-blue-100 text-blue-950 p-6 rounded-lg">
            <div className="text-lg">BLEUスコア</div>

            <div className="mt-2">
              <span>
                <span className="text-5xl font-bold">35.06</span>
                <span className="text-3xl">+</span>
              </span>
            </div>

            <p className="mt-2">
              tunciの翻訳精度は、BLEUスコアで37.02を記録しています。これは、先行研究の成果を上回る高い精度です。
            </p>
          </div>

          <div className="flex-1 bg-blue-100 text-blue-950 p-6 rounded-lg">
            <div className="text-lg">総データ数</div>

            <div className="mt-2">
              <span>
                <span className="text-5xl font-bold">122</span>
                <span className="text-3xl">万語</span>
              </span>
            </div>

            <p className="mt-2">
              過去最大規模のコーパスである122万語のコーパスで訓練されています。口承文芸、新聞、歌、教科書などの多様なジャンルが含まれています。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center">使ってみる</h2>
        <p className="text-center">
          tunciでアイヌ語を学び、アイヌ語で話ましょう。
        </p>

        <div className="flex gap-3 justify-center mt-2">
          <Link
            href="/translate"
            className="bg-blue-500 text-white text-lg px-4 py-3 rounded-lg font-bold"
          >
            使ってみる
          </Link>

          <a
            href="https://protopedia.net/prototype/private/d75d0b37-0648-4bda-a1bc-d5d5721a7d24"
            className="border border-blue-500 text-blue-500 px-4 py-3 rounded-lg font-bold bg-white"
          >
            Protopedia
          </a>
        </div>
      </section>
    </main>
  );
}
