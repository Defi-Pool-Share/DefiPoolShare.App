export type Currency = {
  name: string;
  code: string;
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
