import { Wallet } from 'ethers';
import { IEncryptor } from '../lit-services/encryptor/encryptor.interface';

export const createWalletBase = async (
  encryptor: IEncryptor,
  ipfsHash: string,
): Promise<{
  address: string;
  ciphertext: string;
  dataToEncryptHash: string;
}> => {
  const wallet = Wallet.createRandom();
  const walletPk = wallet.privateKey;

  const accessControlPkOnlyAuthorizedAction = [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: '',
      parameters: [':currentActionIpfsId'],
      returnValueTest: {
        comparator: '=',
        value: ipfsHash,
      },
    },
  ];

  const encryptedPk = await encryptor.encrypt(
    walletPk,
    accessControlPkOnlyAuthorizedAction,
    'wallet',
  );
  return {
    address: wallet.address,
    ...encryptedPk,
  };
};
