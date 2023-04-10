export type User = {
  address: string;
  isConnected: boolean;
};

export type CGCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
};

export type Currency = {
  id: string;
  symbol: string;
  address: string;
};

export type CurrencyAmount = {
  currency: Currency;
  value: number;
};

export type Pool = {
  rented: boolean;
  shared: number;
  balance: {
    firstCurrency: CurrencyAmount;
    secondCurrency: CurrencyAmount;
  };
  interests: {
    firstCurrency: CurrencyAmount;
    secondCurrency: CurrencyAmount;
  };
  price: CurrencyAmount;
  rent: {
    monthsDuration: number;
    endDate: Date;
  };
};
