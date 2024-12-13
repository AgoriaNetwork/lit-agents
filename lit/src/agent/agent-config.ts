type MessageExample = {
  user: string;
  content: {
    text: string;
  };
};

type StyleConfig = {
  all: string[];
  chat: string[];
  post: string[];
};

export type AgentConfig = {
  name: string;
  clients: string[];
  modelProvider: string;
  settings: Record<string, unknown>;
  plugins: unknown[];
  bio: string[];
  lore: string[];
  knowledge: string[];
  messageExamples: [MessageExample, MessageExample][];
  postExamples: string[];
  topics: string[];
  style: StyleConfig;
  adjectives: string[];
};
