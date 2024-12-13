import {config} from 'dotenv';
import { IOrchestrator } from './orchestrator.interface';

config();

export class OrchestratorNoDecrypt implements IOrchestrator {
    async getOrchestratorPrivateKey(ciphertext: string, dataToEncryptHash: string): Promise<string> {
        return process.env.ORCHESTRATOR_PK || '';
    }
}