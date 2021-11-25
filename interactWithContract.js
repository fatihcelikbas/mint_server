require("dotenv").config();
const alchemyKey = process.env.API_URL;
const contractABI =
  require("./contract/artifacts/contracts/Colors.sol/Colors.json").abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
const ownerPrivKey = process.env.PRIVATE_KEY;
const ownerAddr = process.env.PUBLIC_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const mint = async () => {
  const contract = await new web3.eth.Contract(contractABI, contractAddress);

  const nonce = await web3.eth.getTransactionCount(ownerAddr, 'latest'); 

  const transaction = {
    'to': contractAddress, // faucet address to return eth
    'value': 0,
    'gas': 300000,
    // 'maxFeePerGas': 1000000108,
    'nonce': nonce,
    'data': contract.methods
      .setTokenURI(1, "ipfs://QmSVUVKv8aXKtLHbF5wo56ko8wAjzDtq2BDEtUM9wThvym")
      .encodeABI(),
  };
   
  const signedTx = await web3.eth.accounts.signTransaction(transaction, ownerPrivKey);
  
  web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
  });
}

mint();