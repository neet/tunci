export type InitiateProgressInfo = {
  status: "initiate";
  /**
   * The model id or directory path.
   */
  name: string;
  /**
   * The name of the file.
   */
  file: string;
};
export type DownloadProgressInfo = {
  status: "download";
  /**
   * The model id or directory path.
   */
  name: string;
  /**
   * The name of the file.
   */
  file: string;
};
export type ProgressStatusInfo = {
  status: "progress";
  /**
   * The model id or directory path.
   */
  name: string;
  /**
   * The name of the file.
   */
  file: string;
  /**
   * A number between 0 and 100.
   */
  progress: number;
  /**
   * The number of bytes loaded.
   */
  loaded: number;
  /**
   * The total number of bytes to be loaded.
   */
  total: number;
};
export type DoneProgressInfo = {
  status: "done";
  /**
   * The model id or directory path.
   */
  name: string;
  /**
   * The name of the file.
   */
  file: string;
};
export type ReadyProgressInfo = {
  status: "ready";
  /**
   * The loaded task.
   */
  task: string;
  /**
   * The loaded model.
   */
  model: string;
};
export type ProgressInfo =
  | InitiateProgressInfo
  | DownloadProgressInfo
  | ProgressStatusInfo
  | DoneProgressInfo
  | ReadyProgressInfo;
