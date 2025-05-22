"use client";

import { Badge, Skeleton } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { useEndpointStatus } from "@/hooks/useEndpointStatus";

export const EndpointStatus: FC = () => {
  const endpoint = useEndpointStatus({
    namespace: "rigarashi",
    endpoint: "mt5-base-ainu-jey",
  });

  const t = useTranslations("components.Banner.EndpointStatus");

  const getMessage = () => {
    switch (endpoint?.status.state) {
      case "scaledToZero":
        return t("scaledToZero");
      case "pending":
      case "initializing":
        return t("pending");
      case "running":
        return t("running");
      case "updating":
      case "updateFailed":
      case "failed":
      case "paused":
        return t("failed");
      default:
        return t("loading");
    }
  };

  const getColor = () => {
    switch (endpoint?.status.state) {
      case "scaledToZero":
        return "gray";
      case "pending":
      case "initializing":
        return "orange";
      case "running":
        return "green";
      case "updating":
      case "updateFailed":
      case "failed":
      case "paused":
        return "red";
      default:
        return "gray";
    }
  };

  if (!endpoint) {
    return (
      <Skeleton>
        <Badge color="gray" radius="full">
          {t("loading")}
        </Badge>
      </Skeleton>
    );
  }

  return (
    <Badge color={getColor()} radius="full">
      {getMessage()}
    </Badge>
  );
};
