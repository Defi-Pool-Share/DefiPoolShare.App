import { ethers } from "ethers";
import contractLendingAbi from "@/lib/contracts/contractLendingAbi.json";

export const useContractLending = () => {
  const config = useRuntimeConfig();

  const getContract = async () => {
    let provider, signer, contract;

    if ((window as any).ethereum) {
      provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      contract = new ethers.Contract(
        config.public.contract.lending,
        contractLendingAbi.abi,
        signer
      );
    } else {
      provider = ethers.providers.getDefaultProvider();
      contract = new ethers.Contract(
        config.public.contract.lending,
        contractLendingAbi.abi,
        provider
      );
    }

    let contractCode = await contract.provider.getCode(contract.address);

    return contractCode !== "0x" ? contract : null;
  };

  const getLoanInfo = async (index: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.getLoanInfo(index);

    return res;
  };

  return {
    getLoanInfo,
  };
};
