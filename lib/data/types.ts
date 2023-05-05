export type User = {
  address: string;
  isConnected: boolean;
};

export type CGCoin = {
  id: string;
  address: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
};

export type Token = {
  address: string;
  name: string;
  symbol: string;
};

export type TokenAmount = {
  token: Token;
  value: number;
};

export type UniPool = {
  id: number;
  owner: string;
  token0: TokenAmount;
  token1: TokenAmount;
  loan?: Loan;
};

export type Loan = {
  lender: string; // address
  borrower: string; // address
  tokenId: number; // uniswap pool ID
  loanAmount: number;
  creationTime: number; // timestamp
  startTime: number; // timestamp
  endTime: number; // timestamp
  acceptedToken: string; // token contract adress
  isActive: boolean;
  loanIndex: number;
};

export type Feedback = {
  text: string;
  type: "info" | "success" | "warning" | "danger";
  loading: boolean;
};
