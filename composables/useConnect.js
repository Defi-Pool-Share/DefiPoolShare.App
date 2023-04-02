import { ethers } from "ethers";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

export const useConnect = () => {
  const isConnected = ref(false);
  const isOnMainnet = ref(false);
  const address = ref(null);
  const provider = ref(null);

  const connect = async () => {
    const { accounts } = window.ethereum
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
    const accounts = await window.ethereum.request({
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

  const initData = async () => {
    const tmpProvider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();

    const network = await tmpProvider.getNetwork();

    isOnMainnet.value = network.chainId === 1;
    provider.value = tmpProvider;
  };

  onMounted(() => {
    initData();
    connect();
  });

  return {
    connect,
    disconnect,
    isConnected,
    isOnMainnet,
    address,
    provider,
  };
};
