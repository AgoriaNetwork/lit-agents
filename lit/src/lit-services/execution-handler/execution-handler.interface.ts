import { EvmArbitraryCall } from '../../types/evm-arbitrary-call';
import { ethers } from 'ethers';

export interface IExecutionHandler {
  getNonce(): Promise<number>;
  getAddress(): string;
  getProvider(): ethers.providers.JsonRpcProvider;
  executeEvm: (executionData: EvmArbitraryCall) => Promise<string>;
}
