import { ethers } from 'ethers';
import { AiProvider } from '../ai-provider/ai-provider.model';
import { ToolCall, ToolResult } from '../ai-provider/ai-types';
import { LitAgentsContract } from '../evm/lit-agents/lit-agents';
import { IExecutionHandler } from '../lit-services/execution-handler/execution-handler.interface';
import { Codex } from '../token-details/token-details';
import { getOdosQuote } from '../token-odos/odos-token-purchase';
import { Erc20Service } from '../evm/lit-agents/erc20.service';

export class AgentRuntime {
  constructor(
    protected aiProvider: AiProvider,
    protected codex: Codex,
    protected executionHandler: IExecutionHandler,
    protected agentId: number,
  ) {}

  async run(prompt: string): Promise<string> {
    const litAgents = new LitAgentsContract();
    const { address, character, action } = await litAgents.getAgentInfo(
      this.agentId,
    );

    console.log('Agent info:', address, character, action);

    if (!action || !character)
      throw new Error('Failed to get agent action or character');
    if (
      this.executionHandler.getAddress().toLowerCase() !== address.toLowerCase()
    )
      throw new Error('Agent address does not match execution handler address');

    const portfolio = await this.codex.portfolioDetails(address);

    console.log(
      character +
        `\n You can use the tools proposed and buy a token if it is interesting enough \n\n Portfolio: \n${JSON.stringify(portfolio)}`,
    );

    const res = await this.aiProvider.run(
      'gpt-4o-mini',
      prompt,
      character +
        `\n You can use the tools proposed and buy a token if it is interesting enough \n\n Portfolio: \n${JSON.stringify(portfolio)}`,
      [
        {
          type: 'function',
          function: {
            name: 'token-details',
            description:
              'Fetches details about a token based on its address, name, or symbol',
            parameters: {
              type: 'object',
              properties: {
                phrase: {
                  type: 'string',
                  description: 'Token address, name, or symbol',
                },
              },
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'buy-token',
            description: 'Buys the token with the given address.',
            parameters: {
              type: 'object',
              properties: {
                tokenIn: {
                  type: 'string',
                  description: 'Token address of the token to sell',
                },
                tokenOut: {
                  type: 'string',
                  description: 'Token address of the token to buy',
                },
                amountIn: {
                  type: 'string',
                  description: 'Amount of tokenIn to sell in WEI',
                },
              },
            },
          },
        },
      ],

      async (calls: ToolCall[]) => {
        const results: ToolResult[] = [];

        for (const call of calls) {
          if (call.function.name === 'token-details') {
            const tokenDetails = await this.codex.tokenDetails(
              JSON.parse(call.function.arguments).phrase,
            );
            results.push({
              function: call.function.name,
              output: JSON.stringify(tokenDetails),
            });
          }
          if (call.function.name === 'buy-token') {
            const { tokenIn, tokenOut, amountIn } = JSON.parse(
              call.function.arguments,
            );

            const quote = await getOdosQuote(
              address,
              tokenIn,
              tokenOut,
              amountIn,
            );
            console.log('Quote:', quote);
            const nonce = await this.executionHandler.getNonce();

            const erc20 = new Erc20Service(
              tokenIn,
              this.executionHandler.getProvider(),
            );
            const approvalTx = await erc20.prepApproveTx(
              quote.transaction.to,
              amountIn,
            );
            await this.executionHandler.executeEvm({ ...approvalTx, nonce });
            const tx = await this.executionHandler.executeEvm({
              to: quote.transaction.to,
              data: quote.transaction.data,
              value: ethers.utils
                .parseEther(quote.transaction.value || '0')
                .toString(),
              nonce: nonce + 1,
            });
            results.push({
              function: call.function.name,
              output: JSON.stringify(tx),
            });
          }
        }

        return results;
      },
    );

    return res;
  }
}
