import { isValue } from "~/lib/modules/definition";
import { UniPool, Loan } from "~/lib/data/types";

export const useAppApi = () => {
  const config = useRuntimeConfig();

  const baseUrl = config.public.api.app;

  const getAllLoans = async () => {
    let loans: Loan[] = [
      {
        lender: "0x05a32581e517c872f78e9c58ab7828e1b10ac140",
        borrower: "0x0000000000000000000000000000000000000000",
        tokenId: 63697,
        loanAmount: "10000000000000000000",
        creationTime: 1683645912,
        startTime: 0,
        endTime: 1683646501,
        acceptedToken: "0x0cb80b1c0e6aebb031a7ec26219ab162f0f9bc2b",
        isActive: true,
        loanIndex: 9,
      },
    ];

    try {
      const res = await fetch(baseUrl + "loan", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      if (data) {
        loans = data;
      }
    } catch (e) {
      console.log(e);
    }

    return loans;
  };

  const mapUniPool = (pool) => {
    return {
      id: parseInt(pool.id, 10),
      owner: pool.owner,
      token0: {
        token: {
          address: pool.token0.id,
          name: pool.token0.name,
          symbol: pool.token0.symbol,
        },
        value: parseFloat(pool.depositedToken0),
      },
      token1: {
        token: {
          address: pool.token1.id,
          name: pool.token1.name,
          symbol: pool.token1.symbol,
        },
        value: parseFloat(pool.depositedToken1),
      },
    };
  };

  return {
    getAllLoans,
  };
};
