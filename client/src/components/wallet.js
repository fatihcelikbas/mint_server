import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "../utils/interact";

const Wallet = (props) => {
  const [walletAddress, setWallet] = useState("");

  useEffect( () => {
    async function fetchMyAPI() {
      const { address } = await getCurrentWalletConnected();

      setWallet(address);

      addWalletListener();
    }
    fetchMyAPI();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    } 
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  return (
    <div className="absolute right-20 top-20  bg-white hover:bg-gray-100 text-black  py-2 px-4 border border-black rounded shadow">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
    </div>
  )
}

export default Wallet;