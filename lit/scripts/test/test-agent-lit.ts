import { config } from 'dotenv';
import { getLitNodeClient } from '../utils/lit-client';

import getLitAction from '../utils/get-lit-action';
import { getExecutorSessionSigs } from '../utils/lit-auth';
import { AccessControlConditions } from '@lit-protocol/types';
import { encryptString } from '../utils/encrypt-string';

config();

export const testFillOrderAction = async () => {
  try {
    const litNodeClient = await getLitNodeClient('datil-dev', true);

    const actionFile = getLitAction('AGENT');
    const sessionSigs = await getExecutorSessionSigs();

    const access: AccessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '0',
        },
      },
    ];

    const params = {
      openAiApiKey: process.env.OPENAI_API_KEY,
      codexApiKey: process.env.CODEX_API_KEY,
      agentPk: process.env.AGENT_PK,
    };

    console.log('params=>', params);

    const encryptedParams = await encryptString(
      JSON.stringify(params),
      access,
      litNodeClient,
    );

    const startTime = new Date().getTime();
    const output = await litNodeClient.executeJs({
      code: actionFile,
      sessionSigs: sessionSigs,
      jsParams: {
        encryptedParams,
        accessControlConditions: access,
        prompt: 'Buy VIRTUAL',
      },
    });

    console.log('time for signing=>', new Date().getTime() - startTime);
    console.log('output=>', output);
  } catch (e) {
    console.log('error in fill order=>', e);
  }
};

testFillOrderAction();
