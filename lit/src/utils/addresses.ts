import { ChainId } from '../types/chain-id';
import { ENVIRONMENT } from '../types/environment';

export const GENIUS_VAULT_ADR = (
  chainId: ChainId,
  env: ENVIRONMENT,
): string => {
  switch (env) {
    case ENVIRONMENT.STAGING:
      return GENIUS_VAULT_ADR_STAGING(chainId);
  }
  throw new Error(`Environment not found: ${env}`);
};

export const GENIUS_PROXY_CALL_ADR = (
  chainId: ChainId,
  env: ENVIRONMENT,
): string => {
  switch (env) {
    case ENVIRONMENT.STAGING:
      return GENIUS_PROXY_CALL_ADR_STAGING(chainId);
  }
  throw new Error(`Environment not found: ${env}`);
};

export const GENIUS_VAULT_ADR_STAGING = (chainId: ChainId): string => {
  switch (chainId) {
    case ChainId.BASE:
      return '0x55EeA27E6D84f129d6e7d51647Df12f960429a67';
    case ChainId.OPTIMISM:
      return '0x158772717C2D1308c13EFa92B82a0dbAc80bCFE1';
  }
  throw new Error(`No Genius Vault address found for chainId: ${chainId}`);
};

export const GENIUS_PROXY_CALL_ADR_STAGING = (chainId: ChainId): string => {
  switch (chainId) {
    case ChainId.BASE:
      return '0x2a2d18179721e4F67aC2f417259eDd9239196b62';
    case ChainId.OPTIMISM:
      return '0x8A1c0E832f60bf45bBB5DD777147706Ed5cB6602';
  }
  throw new Error(`No Genius Proxy Call address found for chainId: ${chainId}`);
};

export const STABLECOIN_ADR = (chainId: ChainId): string => {
  switch (chainId) {
    case ChainId.BASE:
      return '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA';
    case ChainId.OPTIMISM:
      return '0x7F5c764cBc14f9669B88837ca1490cCa17c31607';
  }
  throw new Error(`No stablecoin address found for chainId: ${chainId}`);
};

export const GENIUS_API_URL = (env: ENVIRONMENT): string => {
  switch (env) {
    case ENVIRONMENT.TEST: 
      return 'http://localhost:3002';
    case ENVIRONMENT.STAGING:
      return 'https://api.staging.geniuswallet.io';
  }
  throw new Error(`Environment not found: ${env}`);
};
