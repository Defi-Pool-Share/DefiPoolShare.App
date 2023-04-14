import { ethers } from "ethers";
import contractLendingAbi from "@/lib/contracts/contractLendingAbi.json";
import { Loan } from "@/lib/data/types";

export const useContractLending = () => {
  const config = useRuntimeConfig();
  const { getPoolsByIds } = useUniswap();

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

  const borrowNFT = async (loanIndex: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.borrowNFT(loanIndex);

    return res;
  };

  const claimFees = async (loanIndex: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.claimFees(loanIndex);

    return res;
  };

  const depositNFT = async (
    tokenId: number,
    loanAmount: number,
    loanDuration: number,
    acceptedToken: string
  ) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.depositNFT(
      tokenId,
      loanAmount,
      loanDuration,
      acceptedToken
    );

    return res;
  };

  const reactivateLoan = async (
    loanIndex: number,
    loanDuration: number,
    loanAmount: number
  ) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.reactivateLoan(
      loanIndex,
      loanDuration,
      loanAmount
    );

    return res;
  };

  const whitelistToken = async (token: string, state: boolean) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.whitelistToken(token, state);

    return res;
  };

  const withdrawNFT = async (loanIndex: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.withdrawNFT(loanIndex);

    return res;
  };

  const canClaimFees = async (loanIndex: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.getLoanInfo(loanIndex);

    return res;
  };

  const getLoanInfo = async (loanIndex: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res: Loan = await contract.getLoanInfo(loanIndex);

    return res;
  };

  const getAllLoans = async () => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    let res: Loan[] = [];
    for (let index = 0; index < 3; index++) {
      const loan = await getLoanInfo(index);
      if (loan) {
        res.push(loan);
      }
    }

    let tokenIds = res.map((loan) => loan.tokenId.toString());

    const pools = await getPoolsByIds(tokenIds);

    let loans: Loan[] = [];

    res.forEach((loan) => {
      const matchingPool = pools.find(
        (pool) => pool.id.toString() === loan.tokenId.toString()
      );

      if (loan.isActive && matchingPool) {
        loans.push({
          ...loan,
          pool: matchingPool,
        });
      } else if (loan.isActive) {
        loans.push(loan);
      }
    });

    return loans;
  };

  const getLoanByBorrowers = async (owner: string) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract._loanByBorrowers(owner);

    return res;
  };

  return {
    borrowNFT,
    claimFees,
    depositNFT,
    reactivateLoan,
    whitelistToken,
    withdrawNFT,
    canClaimFees,
    getLoanInfo,
    getAllLoans,
    getLoanByBorrowers,
  };
};
