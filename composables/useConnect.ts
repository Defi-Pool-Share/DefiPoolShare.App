import { ethers } from "ethers";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export const useConnect = () => {
  const isConnected = ref(false);
  const isOnMainnet = ref(false);
  const address = ref(null);

  const getProvider = () => {
    let provider;

    if ((window as any).ethereum) {
      provider = new ethers.providers.Web3Provider((window as any).ethereum);
    } else {
      provider = ethers.providers.getDefaultProvider();
    }

    return provider;
  };

  const connect = async () => {
    const { accounts } = (window as any).ethereum
      ? await connectMetamask()
      : await connectWalletConnect();

    if (accounts && accounts.length) {
      isConnected.value = true;
      address.value = accounts[0];
    }
  };

  const disconnect = async () => {
    isConnected.value = false;
    address.value = null;
  };

  const connectMetamask = async () => {
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    return {
      accounts,
    };
  };

  const connectWalletConnect = async () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
      qrcodeModalOptions: {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar",
        ],
      },
    });
    const { accounts } = await connector.connect();

    return {
      accounts,
    };
  };

  const checkNetwork = async () => {
    const provider = getProvider();

    const network = await provider.getNetwork();

    isOnMainnet.value = network.chainId === 1;
  };

  return {
    connect,
    disconnect,
    isConnected,
    isOnMainnet,
    address,
    getProvider,
  };
};
