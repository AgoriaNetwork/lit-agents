import { OpenaiService } from '../ai-provider/openai.service';
import { Executor } from '../executor/executor';
import { ExecutionHandler } from '../lit-services/execution-handler/execution-handler';
import { Codex } from '../token-details/token-details';
import { AgentRuntime } from './runtime';
import { config } from 'dotenv';

config();

/**
 * AI Agent runtime Action
 *
 * @param {EncryptedData} encryptedParams
 * @param {AccessControlConditions} accessControlConditions
 *
 */
const go = async () => {
  try {
    const agentId = 0;

    const executor = new Executor();
    const aiProvider = new OpenaiService(
      executor,
      process.env.OPENAI_API_KEY || '',
    );

    const codex = new Codex(process.env.CODEX_API_KEY || '');
    const executionHandler = new ExecutionHandler(process.env.AGENT_PK || '');
    const runtime = new AgentRuntime(
      aiProvider,
      codex,
      executionHandler,
      agentId,
    );
    const res = await runtime.run('buy $AIXBT');
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

go();
