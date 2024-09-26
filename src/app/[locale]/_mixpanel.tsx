"use client";

import mixpanel from "mixpanel-browser";
import { FC, useEffect } from "react";

export const Mixpanel: FC = () => {
  useEffect(() => {
    mixpanel.init("c4e076ff3ac1a7b9f1322efe06874e84", {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  }, []);

  return null;
};
