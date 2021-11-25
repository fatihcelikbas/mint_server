require("dotenv").config();
const alchemyKey = process.env.API_URL;
const contractABI = require("../contract/artifacts/contracts/Colors.sol/Colors.json").abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
const ownerPrivKey = process.env.PRIVATE_KEY;
const ownerAddr = process.env.PUBLIC_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const getTokenUri = async tokenId => {
  const contract = await new web3.eth.Contract(contractABI, contractAddress);
  return contract.methods
      .tokenURI(tokenId)
      .call();
}

exports.getTokenUri = getTokenUri;