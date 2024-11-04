import { useEffect, useState } from "react";

export type UsePrefersColorSchemeResult = {
  prefersColorScheme: string;
};

export function usePrefersColorScheme() {
  const [prefersColorScheme, setPrefersColorScheme] = useState<string>("light");

  const handleChange = (event: MediaQueryListEvent) => {
    setPrefersColorScheme(event.matches ? "dark" : "light");
  };

  useEffect(() => {
    setPrefersColorScheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    );
  }, []);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", handleChange);
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, []);

  return {
    prefersColorScheme,
  };
}
