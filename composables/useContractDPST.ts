import { ethers } from "ethers";
import contractErc20Abi from "@/lib/contracts/contractErc20Abi.json";

export const useContractDPST = () => {
  const config = useRuntimeConfig();

  const getContract = async () => {
    let provider, signer, contract;

    if ((window as any).ethereum) {
      provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      contract = new ethers.Contract(
        config.public.contract.dpst,
        contractErc20Abi,
        signer
      );
    } else {
      provider = ethers.providers.getDefaultProvider();
      contract = new ethers.Contract(
        config.public.contract.dpst,
        contractErc20Abi,
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

  const approve = async (amount: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.approve(config.public.contract.lending, amount, {
      gasLimit: 400000,
    });

    return res;
  };

  return {
    getProvider,
    approve,
  };
};
