// imports
const hre = require("hardhat");
const fs = require('fs');

// function to deploy the contracts
async function main() {

  //deploy the token
  const ZamaTokenMint = await hre.ethers.getContractFactory("ZamaTokenMint");
  const zama = await ZamaTokenMint.deploy();
  await zama.deployed();
  console.log("zama deployed to:", zama.address);


  // export the addresses
  fs.writeFileSync('scripts/address.js', `
    export const zamaAddress = '${zama.address}'

  `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
