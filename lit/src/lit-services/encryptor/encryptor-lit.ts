//@ts-nocheck
import { IEncryptor } from "./encryptor.interface";

export class EncryptorLit implements IEncryptor {
    async encrypt(toEncrypt: string, accessCondition: any[], sigName: string): Promise<{
        ciphertext: string;
        dataToEncryptHash: string;  
    }> {
        const utf8Encode = new TextEncoder();
        const encodedData = utf8Encode.encode(toEncrypt);   

        const resp = await Lit.Actions.runOnce(
            { waitForResponse: true, name: 'encryptPk' },
            async () => {
              try {
                const { ciphertext, dataToEncryptHash } = await Lit.Actions.encrypt({
                    accessControlConditions: accessCondition,
                    to_encrypt: encodedData,
                });
                return JSON.stringify({
                  ciphertext,
                  dataToEncryptHash,
                });
              } catch (e: any) {
                console.log('error: ', e);
                return JSON.stringify({
                  message: e.message,
                  note: 'Error in encrypting the private key.',
                });
              }
            },
          );

        return JSON.parse(resp);
    };
}