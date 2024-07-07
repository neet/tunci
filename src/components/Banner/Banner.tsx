import { FC } from "react";
import clsx from "clsx";
import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const Banner: FC = () => {
  return (
    <header
      className={clsx(
        "w-full max-w-screen-xl mx-auto",
        "flex items-center justify-between",
        "mt-4"
      )}
    >
      <h1 className="font-serif text-4xl leading-relaxed">
        <Link href="/" className="text-black dark:text-white no-underline">
          tunci
        </Link>
      </h1>

      <Link href="/about" className="text-blue-600 dark:text-blue-400 underline">
        <InformationCircleIcon className="size-5 mr-0.5 inline-block" />
        このサイトについて
      </Link>
    </header>
  );
};
