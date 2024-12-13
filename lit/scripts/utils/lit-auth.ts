import { Wallet, ethers } from 'ethers';
import { config } from 'dotenv';
import {
  AuthMethod,
  IRelayPKP,
  LitAbility,
  SessionSigs,
} from '@lit-protocol/types';
import { AuthMethodType } from '@lit-protocol/types/src/lib/enums';
import { getLitNodeClient } from './lit-client';
import { getWalletAuthSig } from './wallet-auth-sig';
import { ProviderType, AuthMethodScope } from '@lit-protocol/constants';
import { BaseProvider, LitAuthClient } from '@lit-protocol/lit-auth-client';
import { LitActionResource, LitPKPResource } from '@lit-protocol/auth-helpers';

config();

export const getExecutorSessionSigs = async (): Promise<SessionSigs> => {
  const nodeClient = await getLitNodeClient('datil-dev', true);

  const litAuthClient = new LitAuthClient({
    litRelayConfig: {
      relayApiKey: process.env.LIT_RELAY_API_KEY,
    },
    debug: true,
    rpcUrl: process.env.LIT_RPC_URL,
    litNodeClient: nodeClient,
  });

  litAuthClient.initProvider(ProviderType.EthWallet);

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.LIT_RPC_URL,
  );
  const actionExecutor = new Wallet(process.env.EXECUTOR_PK || '', provider);

  const authSig = await getWalletAuthSig(actionExecutor);
  const authMethod = {
    authMethodType: AuthMethodType.EthWallet,
    accessToken: JSON.stringify(authSig),
  };

  const authProvider = litAuthClient.getProvider(ProviderType.EthWallet);

  if (!authProvider) throw new Error('No auth provider found');

  let pkps = await authProvider.fetchPKPsThroughRelayer(authMethod);

  if (pkps.length === 0) {
    const options = {
      permittedAuthMethodScopes: [[AuthMethodScope.SignAnything]],
    };

    await authProvider.mintPKPThroughRelayer(authMethod, options);

    pkps = await authProvider.fetchPKPsThroughRelayer(authMethod);
  }

  const sessionSigs = await nodeClient.getPkpSessionSigs({
    pkpPublicKey: pkps[0].publicKey,
    authMethods: [authMethod],
    expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    resourceAbilityRequests: [
      {
        resource: new LitPKPResource('*'),
        ability: LitAbility.PKPSigning,
      },
      {
        resource: new LitActionResource('*'),
        ability: LitAbility.LitActionExecution,
      },
    ],
  });
  return sessionSigs;
};

export const mintPkp = async (
  authMethod: AuthMethod,
  provider: BaseProvider,
): Promise<void> => {
  const options = {
    permittedAuthMethodScopes: [[AuthMethodScope.SignAnything]],
  };
  // Mint PKP using the auth method
  await provider.mintPKPThroughRelayer(authMethod, options);
};

export const fetchPkps = async (
  authMethod: AuthMethod,
  provider: BaseProvider,
): Promise<IRelayPKP[]> => {
  return await provider.fetchPKPsThroughRelayer(authMethod);
};

// const LIT_ACTION = fs.readFileSync(path, 'utf8');

// AddLitActionAuth(LIT_ACTION);
