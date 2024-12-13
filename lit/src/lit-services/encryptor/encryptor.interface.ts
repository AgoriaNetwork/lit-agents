export interface IEncryptor {
    encrypt(data: string, accessCondition: any[], sigName: string): Promise<{
        ciphertext: string;
        dataToEncryptHash: string;  
    }>;
}