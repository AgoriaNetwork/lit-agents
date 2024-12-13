export interface SocialLinks {
  telegram: string | null;

  twitter: string | null;

  website: string | null;
}

export interface TokenInfo {
  totalSupply: string;

  circulatingSupply: string;

  description: string | null;

  imageLargeUrl: string | null;

  imageThumbUrl: string | null;
}

export interface Token {
  address: string;

  networkId: number;

  createdAt: string;

  creatorAddress: string;

  decimals: number;

  name: string;

  symbol: string;

  isScam: boolean;

  socialLinks: SocialLinks;

  info: TokenInfo;
}

export interface TokenResult {
  volume24: number;

  liquidity: number;

  marketCap: number;

  priceUSD: number;

  change24: number;

  token: Token;
}

export interface GetTokenResponse {
  data?: {
    filterTokens: {
      count: number;
      page: number;
      results: TokenResult[];
    };
  };
}

export interface TopToken {
  address: string;

  decimals: number;

  imageSmallUrl: string;

  id: string;

  liquidity: number;

  name: string;

  networkId: number;

  marketCap: number;

  price: number;

  priceChange24: number;

  resolution: string;

  symbol: string;

  volume: number;
}

export type NewPair = {
  newToken: string;
  networkId: number;
  token0: {
    address: string;
  };
  token1: {
    address: string;
  };
};

export type NewPairsResponse = {
  data: {
    getLatestPairs: {
      items: NewPair[];
    };
  };
};

export interface TopTokensResponse {
  data: {
    listTopTokens: TopToken[];
  };
}
