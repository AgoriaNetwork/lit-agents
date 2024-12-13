import { Contract, ethers } from 'ethers';
import { EvmArbitraryCall } from '../../types/evm-arbitrary-call';

// ERC20 ABI - only including the methods we need
const ERC20_ABI = [
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
];

export class Erc20Service {
  public address: string;
  public provider: ethers.providers.JsonRpcProvider;
  private contract: Contract;

  constructor(address: string, provider: ethers.providers.JsonRpcProvider) {
    this.address = address;
    this.provider = provider;
    this.contract = new Contract(address, ERC20_ABI, provider);
  }

  public async allowance(owner: string, spender: string): Promise<bigint> {
    return this.contract.allowance(owner, spender);
  }

  public async prepApproveTx(
    spender: string,
    amount: string,
  ): Promise<EvmArbitraryCall> {
    const tx = await this.contract.populateTransaction.approve(spender, amount);

    return {
      to: this.address,
      data: tx.data || '',
      value: '0',
    };
  }
}
