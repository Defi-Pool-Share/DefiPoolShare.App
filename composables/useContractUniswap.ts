import { ethers } from "ethers";
import contractUniswapV3Abi from "@/lib/contracts/contractUniswapV3Abi.json";

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
      true,
      {
        from: owner,
      }
    );

    return res;
  };

  return {
    isApprovalForAll,
    setApprovalForAll,
    getProvider,
  };
};
