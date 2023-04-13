import { useCoinsStore } from "~/stores/coins";
import { isValue } from "~/lib/modules/definition";
import { CGCoin } from "~/lib/data/types";

export const useCoinGecko = () => {
  const config = useRuntimeConfig();
  const coinsStore = useCoinsStore();

  const baseUrl = config.public.api.coingecko;

  type Coin = {
    value: number;
    price: number;
  };

  type TwoCoins = {
    first: Coin;
    second: Coin;
  };

  const getAllCoinsData = () => {
    fetch(
      baseUrl +
        "/coins/markets?" +
        new URLSearchParams({
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: "250",
          page: "1",
          sparkline: "false",
          locale: "en",
        }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          coinsStore.setData(res);
        }
      });
  };

  const getCoinData = async (address: string) => {
    let coin = coinsStore.data.find((coin) => coin.address === address);

    if (!isValue(coin)) {
      const res = await fetch(baseUrl + "/coins/ethereum/contract/" + address, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const data = await res.json();

      if (data && !data.error) {
        const newCoin: CGCoin = {
          id: data.id,
          symbol: data.symbol,
          name: data.name,
          image: data.image.small,
          current_price: data.market_data.current_price.usd,
        };

        coinsStore.addCoinData(newCoin);

        coin = newCoin;
      }
    }

    return coin ?? null;
  };

  const getCoinVolume = (coin: Coin) => {
    return coin.price * coin.value;
  };

  const getTwoCoinsVolume = (coins: TwoCoins) => {
    return getCoinVolume(coins.first) + getCoinVolume(coins.second);
  };

  const getBalanceBetweenTwoCoins = (coins: TwoCoins) => {
    const volume = getTwoCoinsVolume(coins);
    return {
      first: (getCoinVolume(coins.first) / volume) * 100,
      second: (getCoinVolume(coins.second) / volume) * 100,
    };
  };

  return {
    getAllCoinsData,
    coinsStore,
    getCoinData,
    getCoinVolume,
    getTwoCoinsVolume,
    getBalanceBetweenTwoCoins,
  };
};
