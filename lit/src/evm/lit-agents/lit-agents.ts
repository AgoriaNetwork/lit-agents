import { Contract, ethers } from 'ethers';
import { litAgentsAbi } from './lit-agents.abi';

export class LitAgentsContract {
  public address: string;

  protected providers: Contract[];

  constructor() {
    this.address = '0x957Ed109638c79e9A1ba8D03cC2CFa89115e0A9C';

    const clients = [
      'https://base-pokt.nodies.app',
      'https://1rpc.io/base',
      'https://base.drpc.org',
      'https://base.meowrpc.com',
      'https://base-pokt.nodies.app',
    ].map((rpc) => new ethers.providers.JsonRpcProvider(rpc));
    this.providers = clients.map(
      (client) => new Contract(this.address, litAgentsAbi, client),
    );
  }

  async getAgentInfo(
    agentId: number,
  ): Promise<{ action: string; character: string; address: string }> {
    const randomIndex = Math.floor(Math.random() * this.providers.length);
    for (let i = 0; i < this.providers.length; i++) {
      const contract =
        this.providers[(randomIndex + i) % this.providers.length];

      try {
        const [action, character, address] = await contract.agentInfo(agentId);
        return { action, character, address };
      } catch (e) {
        console.error(
          `Failed to get agent details from rpc ${contract.provider}`,
          e,
        );
      }
    }
    throw new Error('Failed to get agent details from any');
  }

  async getAgentLitAction(agentId: number): Promise<string> {
    const randomIndex = Math.floor(Math.random() * this.providers.length);
    for (let i = 0; i < this.providers.length; i++) {
      const contract =
        this.providers[(randomIndex + i) % this.providers.length];

      try {
        return await contract.agentAction(agentId);
      } catch (e) {
        console.error(
          `Failed to get agent action from rpc ${contract.provider}`,
          e,
        );
      }
    }
    throw new Error('Failed to get agent action from any provider');
  }

  async getAgentCharacter(agentId: number): Promise<string> {
    const randomIndex = Math.floor(Math.random() * this.providers.length);
    for (let i = 0; i < this.providers.length; i++) {
      const contract =
        this.providers[(randomIndex + i) % this.providers.length];

      try {
        return await contract.agentCharacter(agentId);
      } catch (e) {
        console.error(
          `Failed to get agent character from rpc ${contract.provider}`,
          e,
        );
      }
    }
    throw new Error('Failed to get agent character from any provider');
  }
}
