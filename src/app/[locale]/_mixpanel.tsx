"use client";

import mixpanel from "mixpanel-browser";
import { FC, useEffect } from "react";

export type MixpanelProps = {
  token: string;
};

export const Mixpanel: FC<MixpanelProps> = ({ token }) => {
  useEffect(() => {
    mixpanel.init(token, {
      track_pageview: true,
      ignore_dnt: true,
      persistence: "localStorage",
      debug: process.env.NODE_ENV === "development",
    });
  }, [token]);

  return null;
};
