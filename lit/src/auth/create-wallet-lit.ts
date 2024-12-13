//@ts-nocheck
import { createWalletBase } from './create-wallet-base';
import { EncryptorLit } from '../lit-services/encryptor/encryptor-lit';

/**
 * Lit action to create a wallet for a specific lit action
 *
 * @param {string} ipfsHash
 */
const go = async () => {
  const res = await createWalletBase(new EncryptorLit(), ipfsHash);
  return Lit.Actions.setResponse({ response: JSON.stringify(res) });
};

go();
