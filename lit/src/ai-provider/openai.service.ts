import { ExecutorInterface } from '../executor/executor.interface';
import { AiProvider } from './ai-provider.model';
import {
  ToolCall,
  OpenAiModelId,
  Tool,
  ToolResult,
  AiModel,
  openaiModels,
  AiModelId,
  openaiModelIds,
} from './ai-types';

interface OpenAIResponse {
  choices: {
    message: {
      content: string | null;
      tool_calls?: ToolCall[];
    };
    finish_reason: 'stop' | 'tool_calls';
  }[];
}

export class OpenaiService implements AiProvider {
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly headers: HeadersInit;

  public name = 'OpenAI';

  constructor(
    protected readonly executor: ExecutorInterface,
    apiKey: string,
  ) {
    this.headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async run(
    model: OpenAiModelId,
    prompt: string,
    context: string,
    tools?: Tool[],
    toolHandler?: (calls: ToolCall[]) => Promise<ToolResult[]>,
  ): Promise<string> {
    return this.executor.executeOnce<string>(async (): Promise<string> => {
      const messages: any[] = [
        { role: 'system', content: context },
        { role: 'user', content: prompt },
      ];

      let finalResponse = '';

      while (true) {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            messages,
            model,
            tools,
          }),
        });

        if (!response.ok) {
          console.log(response);
          throw new Error(
            `OpenAI API error: ${response.status} ${response.statusText}`,
          );
        }

        const completion = (await response.json()) as OpenAIResponse;

        if (completion.choices.length === 0) return '';

        const choice = completion.choices[0];
        const content = choice.message.content;
        const toolCalls = choice.message.tool_calls;

        if (choice.finish_reason === 'stop') {
          finalResponse = content || '';
          break;
        }

        if (choice.finish_reason === 'tool_calls' && toolCalls && toolHandler) {
          const results = await toolHandler(toolCalls);

          // Add assistant's message with tool calls
          messages.push({
            role: 'assistant',
            content: content || null,
            tool_calls: toolCalls,
          });

          // Add tool results
          for (let i = 0; i < toolCalls.length; i++) {
            messages.push({
              role: 'tool',
              content: results[i].output,
              tool_call_id: toolCalls[i].id,
            });
          }
        }
      }

      console.log('resp=>', finalResponse);
      return finalResponse;
    });
  }

  getModels(): AiModel[] {
    return openaiModels;
  }

  isModelAvailable(model: AiModelId): boolean {
    return openaiModelIds.includes(model);
  }
}
