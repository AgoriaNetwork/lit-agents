//@ts-nocheck
import { ethers } from 'ethers';
import { EvmArbitraryCall } from '../../types/evm-arbitrary-call';
import { IExecutionHandler } from './execution-handler.interface';

export class ExecutionHandlerLit implements IExecutionHandler {
  protected readonly defaultGasLimit = 1_000_000; // Fallback gas limit
  protected readonly gasLimitBuffer = 1.1; // Add 10% buffer to estimated gas
  protected readonly rpcUrls = [
    'https://base-pokt.nodies.app',
    'https://1rpc.io/base',
    'https://base.drpc.org',
    'https://base.meowrpc.com',
    'https://base-pokt.nodies.app',
  ];

  constructor(protected readonly privateKey: string) {}

  public getAddress(): string {
    console.log(this.privateKey);
    const provider = this.getProvider();
    const wallet = new ethers.Wallet(this.privateKey, provider);
    return wallet.address;
  }

  public async executeEvm(executionData: EvmArbitraryCall): Promise<string> {
    const provider = this.getProvider();
    const wallet = new ethers.Wallet(this.privateKey, provider);

    const resp = await Lit.Actions.runOnce(
      { waitForResponse: false, name: 'sendTxn' },
      async () => {
        // Prepare transaction data
        const txData = {
          to: executionData.to,
          data: executionData.data,
          value: executionData.value,
          nonce: await provider.getTransactionCount(wallet.address),
          gasPrice: executionData.gasPrice || (await provider.getGasPrice()),
        };

        // Estimate gas if not provided
        let gasLimit: string;
        if (executionData.gasLimit) {
          gasLimit = executionData.gasLimit;
        } else {
          try {
            const estimatedGas = await provider.estimateGas({
              ...txData,
              from: wallet.address,
            });

            // Add buffer to estimated gas
            gasLimit = Math.ceil(
              estimatedGas.toNumber() * this.gasLimitBuffer,
            ).toString();

            console.log('Estimated gas limit:', gasLimit);
          } catch (error) {
            console.warn(
              'Gas estimation failed, using default gas limit:',
              error,
            );
            gasLimit = this.defaultGasLimit.toString();
          }
        }

        // Send transaction with final gas limit
        const res = await wallet.sendTransaction({
          ...txData,
          gasLimit,
        });

        return res.hash;
      },
    );

    return resp;
  }

  protected getProvider(): ethers.providers.JsonRpcProvider {
    return new ethers.providers.JsonRpcProvider(
      this.rpcUrls[this.rpcUrls.length - 1],
    );
  }
}
