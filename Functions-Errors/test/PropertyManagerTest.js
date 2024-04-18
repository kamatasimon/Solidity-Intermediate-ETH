const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PropertyManager", function () {
    let PropertyManager;
    let propertyManager;
    let owner;
    let tenant;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        PropertyManager = await ethers.getContractFactory("PropertyManager");
        [owner, tenant, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contract, we just have to call PropertyManager.deploy() and await for it to be deployed(), 
        // which happens once its transaction has been mined.
        propertyManager = await PropertyManager.deploy();
        await propertyManager.deployed();
    });

    describe("Transactions", function () {
        it("Should register a property and update property data", async function () {
            const rentalPrice = ethers.utils.parseEther("1.0"); // 1 ether
            await propertyManager.connect(owner).registerProperty(rentalPrice);
            const property = await propertyManager.properties(1);
            expect(property.id).to.equal(1);
            expect(property.rentalPrice).to.equal(rentalPrice);
            expect(property.isRented).to.be.false;
        });

        it("Should start a lease correctly", async function () {
            const rentalPrice = ethers.utils.parseEther("1.0");
            await propertyManager.connect(owner).registerProperty(rentalPrice);
            await propertyManager.connect(tenant).startLease(1, { value: rentalPrice });
            const property = await propertyManager.properties(1);
            expect(property.isRented).to.be.true;
        });

        it("Should allow the owner to end a lease", async function () {
            const rentalPrice = ethers.utils.parseEther("1.0");
            await propertyManager.connect(owner).registerProperty(rentalPrice);
            await propertyManager.connect(tenant).startLease(1, { value: rentalPrice });
            await propertyManager.connect(owner).endLease(1);
            const property = await propertyManager.properties(1);
            expect(property.isRented).to.be.false;
        });

        it("Should allow the owner to withdraw funds", async function () {
            const rentalPrice = ethers.utils.parseEther("1.0");
            await propertyManager.connect(owner).registerProperty(rentalPrice);
            await propertyManager.connect(tenant).startLease(1, { value: rentalPrice });
            const initialBalance = await owner.getBalance();
            await propertyManager.connect(owner).withdraw(rentalPrice);
            const finalBalance = await owner.getBalance();
            expect(finalBalance).to.be.above(initialBalance);
        });

        it("Should revert if non-owner tries to cancel a lease", async function () {
            const rentalPrice = ethers.utils.parseEther("1.0");
            await propertyManager.connect(owner).registerProperty(rentalPrice);
            await propertyManager.connect(tenant).startLease(1, { value: rentalPrice });
            await expect(propertyManager.connect(addr1).cancelLease(1))
                  .to.be.revertedWith("Only the property owner can cancel the lease");
        });
    });
});
