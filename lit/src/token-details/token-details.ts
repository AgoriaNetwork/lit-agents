import axios from 'axios';
import { searchTokensGql } from './search-tokens.gql';
import { GetTokenResponse } from './tokens-gql.dto';
import { portfolioGql } from './portfolio.gql';

export class Codex {
  protected apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async tokenDetails(input: string) {
    const baseUrl = 'https://graph.codex.io/graphql';
    const res = await axios.post<GetTokenResponse>(
      baseUrl,
      { query: searchTokensGql(input) },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.apiKey,
        },
      },
    );

    if (!res || !res.data.data) throw new Error('Failed to search tokens');

    const items = res.data.data.filterTokens.results;
    return items[0];
  }

  async portfolioDetails(address: string) {
    const baseUrl = 'https://graph.codex.io/graphql';
    const res = await axios.post<GetTokenResponse>(
      baseUrl,
      { query: portfolioGql(address) },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.apiKey,
        },
      },
    );

    return res.data;
  }
}
