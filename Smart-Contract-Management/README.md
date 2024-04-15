# Solidity-Intermediate-Smart Contract Management Documentation

# Description:
Solidity-Intermediate-Smart Contract Management is a project aimed at creating a simple smart contract with 2-3 functions and displaying their values in the frontend of the application. This documentation provides the steps to get started with the project and execute it.

# Requirements:
1. MetaMask extension installed in your web browser.

#Getting Started:

1. Clone the Repository:
   Download the entire repository from GitHub to access all the project contents.

2. Install Dependencies:
   In the project directory, open your terminal or command prompt and run the following command to install the required dependencies using npm:

   ```
   npm install
   ```

3. Start Local Hardhat Node:
   After installing the dependencies, run the following command to start the local Hardhat node:

   ```
   npx hardhat node
   ```

4. Deploy the Contract:
   Open a second terminal and deploy the contract on the local Hardhat node using the following command:

   ```
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. Configure MetaMask:
   - Add Hardhat Network: In MetaMask, add a new network with the following settings:
     - Network Name: Hardhat
     - New RPC URL: http://localhost:8545
     - Chain ID: 1337

   - Import Account: In the first terminal where the Hardhat node is running, copy any of the private keys (preferably the first one) and import it into MetaMask.

6. Start the Frontend:
   In the second terminal, run the following command to start the application frontend in development mode:

   ```
   npm start
   ```

7. View the Application:
   Open http://localhost:3000 in your web browser to view the application. You should see the values of the functions displayed on the frontend.

Additional Commands:

- Get Help: To get help or view available Hardhat commands, run:

  ```
  npx hardhat help
  ```

- Test the Contract: To run tests for the smart contract, use the following command:

  ```
  npx hardhat test
  ```

  zama deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3

# Author:
[[Simon Kamata](https://github.com/kamatasimon)] 

# License
This project is licensed under the MIT License.