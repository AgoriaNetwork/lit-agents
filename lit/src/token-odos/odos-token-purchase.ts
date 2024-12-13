import axios from 'axios';

export const getOdosQuote = async (
  inputToken: string,
  outputToken: string,
  amount: string,
): Promise<any> => {
  try {
    const response = await axios.post(`https://api.odos.xyz/sor/quote/v2`, {
      chainId: 8453,
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
    console.log('Quote fetched successfully');
    return response.data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw new Error('Failed to fetch quote');
  }
};
