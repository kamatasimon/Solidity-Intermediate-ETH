## AccountManager Smart Contract

**This is the first project in ETH-Proof-Intermediate, in this project I am tasked to create smart contract that implements the require(), assert() and revert() statements.**

## Overview
The AcountManager smart contract is a simple Solidity contract that demonstrates different ways of handling Account errors and exceptional conditions within a contract. It includes functions for depositing and withdrawing funds, as well as a function for dividing two numbers. Additionally, the contract showcases the usage of require, assert, and revert statements for Account Management.

## Foundry

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

## Author:

[[Kamata Simon](https://github.com/kamatasimon)] 

## License
This project is licensed under the MIT License.
