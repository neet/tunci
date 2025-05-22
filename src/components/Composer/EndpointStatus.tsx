import { Callout, Spinner } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { useEndpointStatus } from "@/hooks/useEndpointStatus";

export type EndpointStatusProps = {
  namespace: string;
  endpoint: string;
  onReady?: () => void;
};

export const EndpointStatus: FC<EndpointStatusProps> = (props) => {
  const t = useTranslations("components.Composer.EndpointStatus");

  const endpoint = useEndpointStatus({
    namespace: props.namespace,
    endpoint: props.endpoint,
    onReady: props.onReady,
  });

  const getMessage = () => {
    switch (endpoint?.status.state) {
      case "scaledToZero":
        return t("scaledToZero");
      case "pending":
        return t("pending", {
          scaleToZeroTimeout: endpoint.compute.scaling.scaleToZeroTimeout,
        });
      case "initializing":
        return t("initializing", {
          scaleToZeroTimeout: endpoint.compute.scaling.scaleToZeroTimeout,
        });
      case "paused":
        return t("paused");
      case "updating":
      case "updateFailed":
      case "failed":
      case "running":
      default:
        return t("running");
    }
  };

  return (
    <Callout.Root role="status" aria-live="polite" aria-atomic>
      <Callout.Icon>
        <Spinner />
      </Callout.Icon>

      <Callout.Text>{getMessage()}</Callout.Text>
    </Callout.Root>
  );
};
