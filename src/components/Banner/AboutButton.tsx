"use client";

import clsx from "clsx";
import { FC, MouseEventHandler, useRef } from "react";
import { Button } from "../Button";

export const AboutButton: FC = () => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleClick: MouseEventHandler = () => {
    if (ref.current) {
      ref.current.showModal();
    }
  };

  return (
    <div>
      <button
        className="text-blue-600 dark:text-blue-400 underline"
        onClick={handleClick}
      >
        このサイトについて
      </button>

      <dialog
        className={clsx(
          "w-full lg:w-1/2",
          "p-4 rounded-lg",
          "text-black dark:text-white",
          "bg-white border border-zinc-300",
          "dark:bg-black dark:border-zinc-700",
          "shadow-lg",
          "backdrop:bg-black/70 backdrop:backdrop-blur"
        )}
        ref={ref}
      >
        <article>
          <h2 className="text-2xl leading-tight font-bold my-1">
            このサイトについて
          </h2>

          <p className="mt-4 leading-relaxed">
            このサイトは、アイヌ語↔日本語の双方向翻訳を行うWebアプリです。現在、アイヌ語学習者に向けて試験的に公開しています。
          </p>

          <p className="mt-4 leading-relaxed">
            当然ながら、誤った翻訳を生成することがあります。アイヌ語初学者の方は、
            <span className="font-bold">
              結果を鵜呑みにせず、かならず講師や上級者に確認
            </span>
            してください。
          </p>

          <p className="mt-4 leading-relaxed">
            このWebサイトのソースコードは、
            <a
              href="https://github.com/neet/tunci"
              className="text-blue-600 dark:text-blue-400 underline"
              target="_blank"
            >
              GitHub
            </a>
            で公開されています。自然言語処理のためのモデルは
            <a
              href="https://huggingface.co/aynumosir"
              className="text-blue-600 dark:text-blue-400 underline"
              target="_blank"
            >
              Hugging Face Hub
            </a>
            に公開しています。
          </p>

          <p className="mt-4 leading-relaxed">
            作者に連絡したい場合は、Xを使ってください。
            <a
              href="https://x.com/TheGodOfNeet"
              className="text-blue-600 dark:text-blue-400 underline"
              target="_blank"
            >
              @TheGodOfNeet
            </a>
          </p>

          <h3 className="mt-4 text-xl leading-tight font-bold my-1">
            参考資料
          </h3>

          <ul className="list-disc pl-5 mt-4">
            <li>
              国立国語研究所『トピック別アイヌ語会話辞典』（
              <a
                href="https://ainu.ninjal.ac.jp/topic/"
                className="text-blue-600 dark:text-blue-400 underline"
                target="_blank"
              >
                https://ainu.ninjal.ac.jp/topic/
              </a>
              ）
            </li>

            <li>
              中川裕、アンナ・ブガエワ、小林美紀、吉川佳見（2016-2024）『アイヌ語口承文芸コーパス―音声・グロス付き―』．国立国語研研究所（
              <a
                href="https://ainu.ninjal.ac.jp/folklore/"
                className="text-blue-600 dark:text-blue-400 underline"
                target="_blank"
              >
                https://ainu.ninjal.ac.jp/folklore/
              </a>
              ）
            </li>
          </ul>
        </article>

        <footer
          className="flex justify-end"
          onClick={() => ref.current?.close()}
        >
          <Button>閉じる</Button>
        </footer>
      </dialog>
    </div>
  );
};
