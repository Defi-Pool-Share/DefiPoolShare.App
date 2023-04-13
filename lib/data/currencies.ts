import { Currency } from "./types";

const glq: Currency = {
  id: "graphlinq-protocol",
  symbol: "glq",
  address: "0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24",
};

const btc: Currency = {
  id: "bitcoin",
  symbol: "btc",
  address: "",
};

const usdc: Currency = {
  id: "usd-coin",
  symbol: "usdc",
  address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
};

const usdt: Currency = {
  id: "tether",
  symbol: "usdt",
  address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
};

const wbtc: Currency = {
  id: "wrapped-bitcoin",
  symbol: "wbtc",
  address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
};

const weth: Currency = {
  id: "weth",
  symbol: "eth",
  address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
};

const dpst: Currency = {
  id: "defipool-share",
  symbol: "dpst",
  address: "0x0Cb80b1c0E6AeBB031a7Ec26219ab162f0F9bC2B",
};

const whitelistedTokens = [dpst, usdt, usdc, weth, wbtc];

function getCurrencyByAddress(address: string) {
  return whitelistedTokens.find((token) => token.address === address);
}

export { weth, glq, btc, whitelistedTokens, getCurrencyByAddress };
