async function main() {
  // Grab the contract factory
  const Colors = await ethers.getContractFactory("Colors");

  // Start deployment, returning a promise that resolves to a contract object
  const colors = await Colors.deploy(); // Instance of the contract
  console.log("Contract deployed to address:", colors.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
