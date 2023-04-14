import getMyPoolsGQL from "@/lib/queries/getMyPools";
import getPoolsByIdsGQL from "@/lib/queries/getPoolsByIds";
import { UniPool } from "~/lib/data/types";
import { isValue } from "~/lib/modules/definition";

export const useUniswap = () => {
  const config = useRuntimeConfig();

  const baseUrl = config.public.api.uniswap;

  const getMyPools = async (address: string) => {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getMyPoolsGQL,
        variables: {
          address: address,
        },
      }),
    });

    const data = await res.json();

    let pools: UniPool[] = [];

    if (isValue(data) && isValue(data.data) && isValue(data.data.positions)) {
      pools = data.data.positions.map(mapUniPool);
    }

    return pools;
  };

  const getPoolsByIds = async (tokenIds: string[]) => {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getPoolsByIdsGQL,
        variables: {
          tokenIds: tokenIds,
        },
      }),
    });

    const data = await res.json();

    let pools: UniPool[] = [];

    if (isValue(data) && isValue(data.data) && isValue(data.data.positions)) {
      pools = data.data.positions.map(mapUniPool);
    }

    return pools;
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
    getMyPools,
    getPoolsByIds,
  };
};
