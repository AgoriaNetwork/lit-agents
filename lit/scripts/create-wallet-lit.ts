import getLitAction from './utils/get-lit-action';
import { getExecutorSessionSigs } from './utils/lit-auth';
import { getLitNodeClient } from './utils/lit-client';

export const testCreateWallet = async (ipfsHash: string) => {
  try {
    const litNodeClient = await getLitNodeClient('datil-dev', true);

    const actionFile = getLitAction('CREATE_WALLET');
    const sessionSigs = await getExecutorSessionSigs();

    const startTime = new Date().getTime();
    const output = await litNodeClient.executeJs({
      code: actionFile,
      sessionSigs: sessionSigs,
      jsParams: {
        ipfsHash,
      },
    });

    console.log('time for signing=>', new Date().getTime() - startTime);
    console.log('output=>', output);
  } catch (e) {
    console.log('error in create wallet=>', e);
  }
};

testCreateWallet('QmXAaJWwVjASy8iMvdzb1UPM2mqwjJ5eczXgaqGi3ukafX')
  .then(console.log)
  .catch(console.error);
