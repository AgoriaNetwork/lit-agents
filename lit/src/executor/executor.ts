export class Executor {
  async executeOnce(fn: () => any) {
    return await fn();
  }
}
