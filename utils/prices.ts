import { CurrencyAmount } from "~/lib/data/types";

const currencyToDollar = (currency: CurrencyAmount) => {
  return currency.value / 10;
};

const displayCryptoPrice = (price: number) => {
  return price.toFixed(8);
};

export { currencyToDollar, displayCryptoPrice };
