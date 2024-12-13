import * as fs from 'fs';

export default function getLitAction(type: 'CREATE_WALLET' | 'AGENT'): string {
  let actionPath: string;

  switch (type) {
    case 'CREATE_WALLET':
      actionPath = 'create-wallet-lit.js';
      break;
    case 'AGENT':
      actionPath = 'runtime-lit.js';
      break;
    default:
      throw new Error(`Unknown action type: ${type}`);
  }

  try {
    return fs.readFileSync(`minified/${actionPath}`, 'utf8');
  } catch (error) {
    console.error(`Error reading file: minified/${actionPath}`, error);
    throw error;
  }
}
