import { Token } from "./types";

const glq: Token = {
  name: "graphlinq-protocol",
  symbol: "glq",
  address: "0x9f9c8ec3534c3ce16f928381372bfbfbfb9f4d24",
};

const usdc: Token = {
  name: "usd-coin",
  symbol: "usdc",
  address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
};

const usdt: Token = {
  name: "tether",
  symbol: "usdt",
  address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
};

const wbtc: Token = {
  name: "wrapped-bitcoin",
  symbol: "wbtc",
  address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
};

const weth: Token = {
  name: "weth",
  symbol: "weth",
  address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
};

const dpst: Token = {
  name: "defipool-share",
  symbol: "dpst",
  address: "0x0Cb80b1c0E6AeBB031a7Ec26219ab162f0F9bC2B",
};

const whitelistedTokens = [dpst, usdt, usdc, weth, wbtc];

function getCurrencyByAddress(address: string) {
  return whitelistedTokens.find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );
}

export {
  dpst,
  usdt,
  usdc,
  weth,
  wbtc,
  whitelistedTokens,
  getCurrencyByAddress,
};
