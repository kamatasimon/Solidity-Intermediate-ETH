// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/AccountManager.sol"; // Adjust the path according to your directory structure

contract AccountManagerTest is Test {
    AccountManager public accountManager;

    function setUp() public {
        accountManager = new AccountManager();
    }

    function testDepositPositiveValue() public {
        uint initialFunds = accountManager.totalFunds();
        uint depositAmount = 100;

        accountManager.depositRequire(depositAmount);

        uint newFunds = accountManager.totalFunds();
        assertEq(
            newFunds,
            initialFunds + depositAmount,
            "Deposit did not increase totalFunds correctly."
        );
    }

    function testDepositZeroValue() public {
        uint depositAmount = 0;

        vm.expectRevert("Deposit must be a positive value.");
        accountManager.depositRequire(depositAmount);
    }
}
