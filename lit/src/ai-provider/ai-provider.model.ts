import {
  OpenAiModelId,
  AiModel,
  AiModelId,
  Tool,
  ToolCall,
  ToolResult,
} from './ai-types';

export interface AiProvider {
  name: string;

  run(
    model: OpenAiModelId,
    prompt: string,
    context: string,
    tools?: Tool[],
    toolHandler?: (calls: ToolCall[]) => Promise<ToolResult[]>,
  ): Promise<string>;

  getModels(): AiModel[];

  isModelAvailable(model: AiModelId): boolean;
}
