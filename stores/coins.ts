import { defineStore } from "pinia";
import { CGCoin } from "~/lib/data/types";

type CoinsStoreState = {
  data: CGCoin[];
};

export const useCoinsStore = defineStore({
  id: "coins",
  state: (): CoinsStoreState => ({
    data: [],
  }),
  actions: {
    setData(data: CGCoin[]) {
      this.data = data;
    },
    addCoinData(coinData: CGCoin) {
      this.data.push(coinData);
    },
  },
});

export default {};
