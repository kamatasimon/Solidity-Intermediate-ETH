// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract PropertyManager {
    uint public totalFunds = 100;
    address public owner;

    struct Property {
        uint id;
        address owner;
        uint rentalPrice;
        bool isRented;
    }

    uint private nextPropertyId = 1;
    mapping(uint => Property) public properties;
    mapping(address => uint) public balances;

    constructor() {
        owner = msg.sender;
    }

    // Registers a new property with a given rental price
    function registerProperty(uint _rentalPrice) public {
        require(_rentalPrice > 0, "Rental price must be positive");
        properties[nextPropertyId] = Property(nextPropertyId, msg.sender, _rentalPrice, false);
        nextPropertyId++;
    }

    // Starts a lease, marking the property as rented
    function startLease(uint _propertyId) public payable {
        require(properties[_propertyId].id != 0, "Property does not exist");
        require(!properties[_propertyId].isRented, "Property is already rented");
        require(msg.value == properties[_propertyId].rentalPrice, "Incorrect rental amount");

        properties[_propertyId].isRented = true;
        balances[properties[_propertyId].owner] += msg.value;
        totalFunds += msg.value;
    }

    // Ends a lease, marking the property as available
    function endLease(uint _propertyId) public {
        require(properties[_propertyId].isRented, "Property is not currently rented");
        require(msg.sender == properties[_propertyId].owner, "Only the owner can end the lease");

        properties[_propertyId].isRented = false;
    }

    // Withdraws funds from the account
    function withdraw(uint _amount) public {
        require(_amount <= balances[msg.sender], "Insufficient funds");
        assert(_amount <= totalFunds); // Ensure that withdrawal amount does not exceed total funds
        payable(msg.sender).transfer(_amount);
        balances[msg.sender] -= _amount;
        totalFunds -= _amount;
    }

    // Example of using revert to enforce a rule
    function cancelLease(uint _propertyId) public {
        if (properties[_propertyId].isRented && msg.sender != properties[_propertyId].owner) {
            revert("Only the property owner can cancel the lease");
        }

        properties[_propertyId].isRented = false; // Lease cancellation logic
    }

    // Fallback function to accept any incoming Ether
    receive() external payable {
        totalFunds += msg.value;
    }
}
