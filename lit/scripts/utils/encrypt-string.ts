import { AccessControlConditions } from "@lit-protocol/types";
import * as LitJsSdk from '@lit-protocol/lit-node-client';

import { webcrypto } from 'crypto';

// Polyfill for crypto
if (!global.crypto) {
  // @ts-ignore
  global.crypto = webcrypto;
}

export const encryptString = async (
    message: string,
    conditions: AccessControlConditions,
    client: LitJsSdk.LitNodeClient,
  ): Promise<{
    ciphertext: string;
    dataToEncryptHash: string;
  }> => {
    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        accessControlConditions: conditions,
        dataToEncrypt: message,
      },
      client,
    );

    // Return the ciphertext and dataToEncryptHash
    return {
      ciphertext,
      dataToEncryptHash,
    };
  };