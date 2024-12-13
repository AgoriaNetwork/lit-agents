//@ts-nocheck

import { OpenaiService } from '../ai-provider/openai.service';
import { Codex } from '../token-details/token-details';
import { Executor } from '../executor/executor-lit';
import { AgentRuntime } from './runtime';
import { ExecutionHandlerLit } from '../lit-services/execution-handler/execution-handler-lit';

/**
 * AI Agent runtime Action
 *
 * @param {string} prompt
 * @param {EncryptedData} encryptedParams -> apiKey
 * @param {AccessControlConditions} accessControlConditions
 *
 */
const go = async () => {
  try {
    const agentId = 0;

    const sParams = await Lit.Actions.decryptAndCombine({
      accessControlConditions,
      ...encryptedParams,
      authSig: null,
      chain: 'ethereum',
    });
    const params = JSON.parse(sParams);

    const executor = new Executor();
    const aiProvider = new OpenaiService(executor, params.openAiApiKey);
    const codex = new Codex(params.codexApiKey);
    const executionHandler = new ExecutionHandlerLit(params.agentPk);
    const runtime = new AgentRuntime(
      aiProvider,
      codex,
      executionHandler,
      agentId,
    );
    const res = await runtime.run(prompt);
    console.log(res);
    return Lit.Actions.setResponse({ response: { res } });
  } catch (e) {
    console.log(e);
    return Lit.Actions.setResponse({ error: { message: e.message } });
  }
};

go();
