import { EvmArbitraryCall } from '../../types/evm-arbitrary-call';

export interface IExecutionHandler {
  getAddress(): string;
  executeEvm: (executionData: EvmArbitraryCall) => Promise<string>;
}
