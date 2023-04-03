import { CurrencyAmount } from "~/lib/data/types";

const currencyToDollar = (currency: CurrencyAmount) => {
  return currency.value / 10;
};

const displayCryptoPrice = (price: number) => {
  return price.toFixed(8);
};

const displayDollars = (price: number) => {
  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3,
  };
  let dollarString = new Intl.NumberFormat("en-US", formatting_options);
  return dollarString.format(price);
};

export { currencyToDollar, displayCryptoPrice, displayDollars };
