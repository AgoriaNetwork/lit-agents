export const portfolioGql = (address: string): string =>
  `
    {
        balances(input: { walletId: "${address}:8453" }) {
            cursor
            items {
                walletId
                tokenId
                balance
                firstHeldTimestamp
                shiftedBalance
            }
        }
    }
`;
