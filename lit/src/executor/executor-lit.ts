//@ts-nocheck

export class Executor {
  async executeOnce(fn: () => any) {
    const resp = await Lit.Actions.runOnce(
      { waitForResponse: true, name: 'prompt' },
      async () => {
        return await fn();
      },
    );
    return resp;
  }
}
