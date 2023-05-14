import { isValue } from "~/lib/modules/definition";
import { UniPool, Loan } from "~/lib/data/types";
import { ssrContextKey } from "nuxt/dist/app/compat/capi";

export const useAppApi = () => {
  const config = useRuntimeConfig();

  const baseUrl = config.public.api.app;

  const getAllLoans = async () => {
    let loans: Loan[] = [];

    try {
      const res = await fetch(baseUrl + "loan", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      data.forEach((loan) => {
        let newData = {};
        Object.keys(loan).map((key) => {
          newData[camelize(key)] = loan[key];
        });

        if (newData) {
          loans.push(newData);
        }
      });
    } catch (e) {
      console.error(e);
    }

    return loans;
  };

  function camelize(str: string) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }

  return {
    getAllLoans,
  };
};
