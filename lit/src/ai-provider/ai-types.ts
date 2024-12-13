export type AiServiceConfig = {
  openaiApiKey?: string;
  replicateApiKey?: string;
};

export type AiModel = {
  id: string;
  name: string;
  provider: 'openai' | 'replicate';
};

export interface Tool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface ToolResult {
  function: string;
  output: string;
}

export type OpenAiModelId = (typeof openaiModelIds)[number];
export type ReplicateModelId = (typeof replicateModelIds)[number];

export type AiModelId = OpenAiModelId | ReplicateModelId;

export const openaiModels: AiModel[] = [
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
  },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai' },
];
export const replicateModels: AiModel[] = [
  {
    id: 'mistralai/mixtral-8x7b-instruct-v0.1',
    name: 'Mixtral 8x7B',
    provider: 'replicate',
  },
  {
    id: 'meta/meta-llama-3-70b-instruct',
    name: 'Llama-3 70B',
    provider: 'replicate',
  },
  {
    id: 'meta/meta-llama-3-8b-instruct',
    name: 'Llama-3 8B',
    provider: 'replicate',
  },
];

export const allModels: AiModel[] = [...openaiModels, ...replicateModels];

export const openaiModelIds = openaiModels.map((m) => m.id);
export const replicateModelIds = replicateModels.map((m) => m.id);
