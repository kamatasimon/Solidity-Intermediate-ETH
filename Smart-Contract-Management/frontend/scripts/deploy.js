// imports
const hre = require("hardhat");
const fs = require('fs');

// function to deploy the contracts
async function main() {

  //deploy the token
  const Zama = await hre.ethers.getContractFactory("ZamaToken");
  const zama = await Zama.deploy();
  await zama.deployed();
  console.log("zama deployed to:", zama.address);


  // export the addresses
  fs.writeFileSync('src/abi/address.js', `
    export const zamaAddress = "${zama.address}"

  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
