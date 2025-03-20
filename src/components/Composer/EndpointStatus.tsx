import { Callout, Spinner } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { Endpoint, State } from "@/models/endpoint";

export type EndpointStatusProps = {
  namespace: string;
  endpoint: string;
  onReady?: () => void;
};

export const EndpointStatus: FC<EndpointStatusProps> = (props) => {
  const { onReady } = props;

  const eventSourceRef = useRef<EventSource | null>(null);
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const prevState = useRef<State | null>(null);
  const t = useTranslations("components.Composer.EndpointStatus");

  const handleMessage = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);
    setEndpoint(data);
  }, []);

  useEffect(() => {
    eventSourceRef.current = new EventSource(
      `/api/endpoint/${props.namespace}/${props.endpoint}/sse`,
    );
    eventSourceRef.current.addEventListener("endpoint", handleMessage);

    return () => {
      eventSourceRef.current?.close();
    };
  }, [props, handleMessage]);

  useEffect(() => {
    if (!endpoint) {
      return;
    }

    const { state } = endpoint.status;

    if (prevState.current !== "running" && state === "running") {
      onReady?.();
      prevState.current = state;
    } else {
      prevState.current = state;
    }
  }, [endpoint, onReady]);

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
    <Callout.Root role="status" aria-live="polite">
      <Callout.Icon>
        <Spinner />
      </Callout.Icon>

      <Callout.Text>{getMessage()}</Callout.Text>
    </Callout.Root>
  );
};
