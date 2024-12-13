export interface ExecutorInterface {
  executeOnce<T>(fn: () => Promise<T>): Promise<T>;
}
