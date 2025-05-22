import { useCallback, useEffect, useRef, useState } from "react";

import { Endpoint, State } from "@/models/endpoint";

export type UseEndpointStatusParams = {
  namespace: string;
  endpoint: string;
  onReady?: () => void;
};

export const useEndpointStatus = (
  params: UseEndpointStatusParams,
): Endpoint | null => {
  const { onReady } = params;

  const eventSourceRef = useRef<EventSource | null>(null);
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const prevState = useRef<State | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);
    setEndpoint(data);
  }, []);

  useEffect(() => {
    eventSourceRef.current = new EventSource(
      `/api/endpoint/${params.namespace}/${params.endpoint}/sse`,
    );
    eventSourceRef.current.addEventListener("endpoint", handleMessage);

    return () => {
      eventSourceRef.current?.close();
    };
  }, [params, handleMessage]);

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

  return endpoint;
};
