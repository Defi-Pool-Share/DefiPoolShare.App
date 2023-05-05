import { ethers, BigNumber } from "ethers";
import contractUniswapV3Abi from "@/lib/contracts/contractUniswapV3Abi.json";
import { UniPool } from "~/lib/data/types";

export const useContractUniswap = () => {
  const config = useRuntimeConfig();

  const getContract = async () => {
    let provider, signer, contract;

    if ((window as any).ethereum) {
      provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      contract = new ethers.Contract(
        config.public.contract.uniswap,
        contractUniswapV3Abi,
        signer
      );
    } else {
      provider = ethers.providers.getDefaultProvider();
      contract = new ethers.Contract(
        config.public.contract.uniswap,
        contractUniswapV3Abi,
        provider
      );
    }

    let contractCode = await contract.provider.getCode(contract.address);

    return contractCode !== "0x" ? contract : null;
  };

  const getProvider = async () => {
    const contract = await getContract();

    if (!contract) {
      return null;
    }
    return contract.provider;
  };

  const isApprovalForAll = async (owner: string) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.isApprovedForAll(
      owner,
      config.public.contract.lending
    );

    return res;
  };

  const setApprovalForAll = async (owner: string) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.setApprovalForAll(
      config.public.contract.lending,
      true
    );

    return res;
  };

  const getUnclaimedFees = async (pool: UniPool) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const MAX = ethers.BigNumber.from(2).pow(128).sub(1).toString(); // "340282366920938463463374607431768211455"

    const encoded = {
      tokenId: pool.id,
      recipient: pool.owner,
      amount0Max: MAX,
      amount1Max: MAX,
    };

    const trx = await contract.callStatic.collect(encoded);

    const formatUnits = (amt: BigNumber, units?: number): string =>
      ethers.utils
        .formatUnits(ethers.BigNumber.from(amt).toString(), units || 18)
        .toString();

    const amount0 = formatUnits(trx.amount0);
    const amount1 = formatUnits(trx.amount1);

    return {
      amount0,
      amount1,
    };
  };

  return {
    isApprovalForAll,
    setApprovalForAll,
    getProvider,
    getUnclaimedFees,
  };
};
