export type State =
  | "pending"
  | "initializing"
  | "updating"
  | "updateFailed"
  | "running"
  | "paused"
  | "failed"
  | "scaledToZero";

export type EndpointStatusProps = {
  namespace: string;
  endpoint: string;
};

export type Endpoint = {
  compute: {
    scaling: {
      scaleToZeroTimeout: number;
    };
  };
  status: {
    state: State;
    message: string;
  };
};
