"use client";
import Hotjar from "@hotjar/browser";

const siteId = 5146238;
const hotjarVersion = 6;

import { FC, useEffect } from "react";

export const _Hotjar: FC = () => {
  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return null;
};

export { _Hotjar as Hotjar };
