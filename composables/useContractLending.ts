import { BigNumber, ethers } from "ethers";
import contractLendingAbi from "@/lib/contracts/contractLendingAbi.json";
import { Loan, UniPool } from "@/lib/data/types";

export const useContractLending = () => {
  const config = useRuntimeConfig();
  const { getPoolsByIds } = useUniswap();
  const { getAllLoans } = useAppApi();

  const getContract = async () => {
    let provider, signer, contract;

    if ((window as any).ethereum) {
      provider = new ethers.providers.Web3Provider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      contract = new ethers.Contract(
        config.public.contract.lending,
        contractLendingAbi,
        signer
      );
    } else {
      provider = ethers.providers.getDefaultProvider();
      contract = new ethers.Contract(
        config.public.contract.lending,
        contractLendingAbi,
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

  const claimFeesLender = async (loanIndex: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res = await contract.claimFeesLender(loanIndex);

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
      ethers.utils.parseUnits(loanAmount.toString(), "ether"),
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

    const res = await contract.canClaimFees(loanIndex);

    return res;
  };

  const getClaimableFees = async (loanIndex: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const trx = await contract.callStatic.claimFees(loanIndex);

    if (trx && trx.length) {
      const formatUnits = (amt: BigNumber, units?: number): string =>
        ethers.utils
          .formatUnits(ethers.BigNumber.from(amt).toString(), units || 18)
          .toString();

      const amount0 = formatUnits(trx[0], 18);
      const amount1 = formatUnits(trx[1]);

      return {
        amount0,
        amount1,
      };
    }

    return null;
  };

  const getClaimableFeesLender = async (loanIndex: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const trx = await contract.callStatic.claimFeesLender(loanIndex);

    if (trx && trx.length) {
      const formatUnits = (amt: BigNumber, units?: number): string =>
        ethers.utils
          .formatUnits(ethers.BigNumber.from(amt).toString(), units || 18)
          .toString();

      const amount0 = formatUnits(trx[0], 18);
      const amount1 = formatUnits(trx[1]);

      return {
        amount0,
        amount1,
      };
    }

    return null;
  };

  const getLoanInfo = async (loanIndex: number) => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const res: Loan = await contract.getLoanInfo(loanIndex);

    return res;
  };

  const getAllPoolsWithLoan = async () => {
    const contract = await getContract();
    if (!contract) {
      return null;
    }

    const allLoans: Loan[] = await getAllLoans();

    const loans = allLoans.filter((loan) => loan.isActive);

    let tokenIds = loans.map((loan) => loan.tokenId.toString());

    const pools = await getPoolsByIds(tokenIds);
    const poolsWithLoan: UniPool[] = mergePoolsAndLoans(pools, loans);

    return poolsWithLoan;
  };

  const getLoansByBorrowers = async (owner: string) => {
    const contract = await getContract();
    if (!contract) {
      return [];
    }

    const res = await contract.getLoanByBorrowersByAddress(owner);

    const loans: Loan[] = [];

    if (res) {
      const promises: Promise<Loan | null>[] = [];
      res.forEach((index: BigNumber) => {
        promises.push(getLoanInfo(parseInt(index.toString(), 10)));
      });
      const tempLoans = await Promise.all(promises);

      tempLoans.forEach((tempLoan) => {
        if (tempLoan) {
          loans.push(tempLoan);
        }
      });
    }

    const tokenIds = loans.map((loan) => loan.tokenId.toString());

    const pools = await getPoolsByIds(tokenIds);
    const poolsWithLoan: UniPool[] = mergePoolsAndLoans(pools, loans);

    return poolsWithLoan;
  };

  const getLoansByLenders = async (owner: string) => {
    const contract = await getContract();
    if (!contract) {
      return [];
    }

    const res = await contract.getLoanByLendersByAddress(owner);

    const loans: Loan[] = [];

    if (res) {
      const promises: Promise<Loan | null>[] = [];
      res.forEach((index: BigNumber) => {
        promises.push(getLoanInfo(parseInt(index.toString(), 10)));
      });
      const tempLoans = await Promise.all(promises);
      tempLoans.forEach((tempLoan) => {
        if (tempLoan) {
          loans.push(tempLoan);
        }
      });
    }

    const tokenIds = loans.map((loan) => loan.tokenId.toString());

    const pools = await getPoolsByIds(tokenIds);
    const poolsWithLoan: UniPool[] = mergePoolsAndLoans(pools, loans);

    return poolsWithLoan;
  };

  const mergePoolsAndLoans = (pools: UniPool[], loans: Loan[]) => {
    let poolsWithLoan: UniPool[] = [];

    pools.forEach((pool) => {
      const matchingLoan = loans.findLast(
        (loan) => loan.tokenId.toString() === pool.id.toString()
      );

      if (matchingLoan) {
        poolsWithLoan.push({
          ...pool,
          loan: matchingLoan,
        });
      }
    });

    return poolsWithLoan;
  };

  return {
    getProvider,
    borrowNFT,
    claimFees,
    claimFeesLender,
    depositNFT,
    reactivateLoan,
    whitelistToken,
    withdrawNFT,
    canClaimFees,
    getClaimableFees,
    getClaimableFeesLender,
    getLoanInfo,
    getAllPoolsWithLoan,
    getLoansByBorrowers,
    getLoansByLenders,
  };
};
