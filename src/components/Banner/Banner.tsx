import { FC } from "react";
import { AboutButton } from "./AboutButton";
import clsx from "clsx";

export const Banner: FC = () => {
  return (
    <header
      className={clsx(
        "w-full max-w-screen-xl mx-auto",
        "flex items-center justify-between",
        "mt-4"
      )}
    >
      <h1 className="font-serif text-4xl leading-relaxed">tunci</h1>
      <AboutButton />
    </header>
  );
};
