import { TokenAmount } from "~/lib/data/types";

const currencyToDollar = (token: TokenAmount) => {
  return token.value / 10;
};

const displayCryptoPrice = (price: number) => {
  return price.toFixed(2);
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
