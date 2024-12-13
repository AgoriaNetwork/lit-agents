import Replicate from 'replicate';
import { AiProvider } from './ai-provider.model';
import {
  ReplicateModelId,
  AiModel,
  replicateModels,
  AiModelId,
  replicateModelIds,
} from './ai-types';

export class ReplicateService implements AiProvider {
  private replicate: Replicate;

  public name = 'Replicate';

  constructor(apiKey: string) {
    this.replicate = new Replicate({ auth: apiKey });
  }

  async run(
    model: ReplicateModelId,
    prompt: string,
    context: string,
  ): Promise<string> {
    const completion = await this.replicate.run(
      model as unknown as `${string}/${string}`,
      {
        input: {
          prompt,
          system_prompt: context,
        },
      },
    );

    return (completion as unknown as string[]).join('');
  }

  getModels(): AiModel[] {
    return replicateModels;
  }

  isModelAvailable(model: AiModelId): boolean {
    return replicateModelIds.includes(model);
  }
}
