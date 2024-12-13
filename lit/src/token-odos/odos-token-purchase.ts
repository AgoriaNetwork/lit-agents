import axios from 'axios';

export const getOdosQuote = async (
  userAddr: string,
  inputToken: string,
  outputToken: string,
  amount: string,
): Promise<any> => {
  try {
    const response = await axios.post(`https://api.odos.xyz/sor/quote/v2`, {
      chainId: 8453,
      userAddr,
      inputTokens: [
        {
          tokenAddress: inputToken,
          amount,
        },
      ],
      outputTokens: [
        {
          tokenAddress: outputToken,
          proportion: 1,
        },
      ],
    });
    const transaction = await axios.post(`https://api.odos.xyz/sor/assemble`, {
      userAddr,
      pathId: response.data.pathId,
    });
    return transaction.data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw new Error('Failed to fetch quote');
  }
};
