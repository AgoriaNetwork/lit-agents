import { ChainId } from "../types/chain-id";

export const RPC_URLS = (chainId: ChainId): string[] => {
    switch (chainId) {
        case ChainId.BASE:
            return ['https://base-pokt.nodies.app', 'https://1rpc.io/base', 'https://base.drpc.org', 'https://base.meowrpc.com', 'https://base-pokt.nodies.app'];
        case ChainId.OPTIMISM:
            return ['https://optimism.llamarpc.com', 'https://op-pokt.nodies.app', 'https://optimism.drpc.org', 'https://mainnet.optimism.io'];
    }
    throw new Error(`No RPC URL found for chainId: ${chainId}`);
};
