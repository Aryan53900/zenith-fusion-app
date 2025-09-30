export interface Chain {
  id: number;
  name: string;
  rpcUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorer: string;
}

export const CHAINS: Record<number, Chain> = {
  39: {
    id: 39,
    name: "U2U Network",
    rpcUrl: "https://rpc-mainnet.uniultra.xyz",
    nativeCurrency: {
      name: "U2U",
      symbol: "U2U",
      decimals: 18,
    },
    blockExplorer: "https://u2uscan.xyz",
  },
  2484: {
    id: 2484,
    name: "U2U Solaris Testnet",
    rpcUrl: "https://rpc-nebulas-testnet.uniultra.xyz",
    nativeCurrency: {
      name: "U2U",
      symbol: "U2U",
      decimals: 18,
    },
    blockExplorer: "https://testnet.u2uscan.xyz",
  },
};

export const DEFAULT_CHAIN_ID = 39;
