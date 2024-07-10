import { FC } from "react";

export const ContentInfo: FC = () => {
  return (
    <footer aria-labelledby="contentinfo-title" className="py-8">
      <h2 id="contentinfo-title" className="sr-only">
        運営者情報
      </h2>

      <p className="text-zinc-600 dark:text-zinc-400 text-center text-sm">
        Copyright
        <span className="mx-1.5" aria-hidden>
          ©
        </span>
        2024 Ryô Igarashi, All rights reserved.
      </p>
    </footer>
  );
};
