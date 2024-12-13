export const searchTokensGql = (phrase: string): string =>
  `
    {
    filterTokens(
        filters: {
            includeScams: false
        }
        ${phrase ? `phrase: "${phrase}"` : ''}
        rankings: [
        {
            attribute: volume24
        }
        {
            attribute: liquidity
        }]
    ) {
        results {
            volume24
            liquidity
            marketCap
            priceUSD
            change24
            token {
                address
                decimals
                name
                networkId
                symbol
                imageSmallUrl
            }
        }
    }
    }
`;
