import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm } from "hardhat";
import { SimpleNFT, SimpleNFT__factory } from "../types";
import { WETH9Mock, WETH9Mock__factory } from "../types";
import { CWETH, CWETH__factory } from "../types";
import { FHEEmelMarket, FHEEmelMarket__factory } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";
// import * as hre from "hardhat";

type Signers = {
  deployer: HardhatEthersSigner;
  acc1: HardhatEthersSigner;
  acc2: HardhatEthersSigner;
  acc3: HardhatEthersSigner;
};


async function deployFixture() {

    const SimpleNFTFactory = (await ethers.getContractFactory("SimpleNFT")) as SimpleNFT__factory;
    const SimpleNFTContract = await SimpleNFTFactory.deploy();
    const SimpleNFTContractAddress = await SimpleNFTContract.getAddress();

    const WETH9MockFactory = (await ethers.getContractFactory("WETH9Mock")) as WETH9Mock__factory;
    const WETH9MockContract = await WETH9MockFactory.deploy();
    const WETH9MockContractAddress = await WETH9MockContract.getAddress();

    const CWETHFactory = (await ethers.getContractFactory("cWETH")) as CWETH__factory;
    const CWETHContract = await CWETHFactory.deploy(WETH9MockContractAddress); 
    const CWETHContractAddress = await CWETHContract.getAddress();

    const FHEEmelMarketFactory = (await ethers.getContractFactory("FHEEmelMarket")) as FHEEmelMarket__factory;
    const fheEmelMarketContract = await FHEEmelMarketFactory.deploy(CWETHContractAddress); 
    const fheEmelMarketContractAddress = await fheEmelMarketContract.getAddress();

    return { 
        SimpleNFTContract,
        SimpleNFTContractAddress,
        WETH9MockContract,
        WETH9MockContractAddress,
        CWETHContract,
        CWETHContractAddress, 
        fheEmelMarketContract,
        fheEmelMarketContractAddress,  
  };
}

describe("FHEEmelMarket Test", function () {
    let signers: Signers;
    let fheEmelMarketContract: FHEEmelMarket;
    let fheEmelMarketContractAddress: string;
    let CWETHContract: CWETH;
    let CWETHContractAddress: string;
    let WETH9MockContract: WETH9Mock;
    let WETH9MockContractAddress: string;
    let SimpleNFTContract: SimpleNFT;
    let SimpleNFTContractAddress: string;

    before(async function () {
        const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
        signers = { 
        deployer: ethSigners[0], 
        acc1: ethSigners[1], 
        acc2: ethSigners[2], 
        acc3: ethSigners[3] 
        };
    });

    beforeEach(async () => {
        // Check if running in FHEVM mock environment
        if (!fhevm.isMock) {
            throw new Error(`This hardhat test suite can only run in FHEVM mock environment`);
        }
        ({ 
            fheEmelMarketContract, 
            fheEmelMarketContractAddress, 
            CWETHContract, 
            CWETHContractAddress,
            WETH9MockContract,
            WETH9MockContractAddress,
            SimpleNFTContract,
            SimpleNFTContractAddress
        } = await deployFixture());
    });

    describe("Contract Deployment and Initialization", function () {
        it("should deploy contract correctly", async function () {
            console.log(SimpleNFTContractAddress)
            expect(SimpleNFTContractAddress).to.be.a('string');
        });
    });
    describe("Create Auction", function () {
        it("mints nft, create auction, place bid", async function () {
            // mint nft
            await SimpleNFTContract.connect(signers.deployer).mint("akabekechua");
            // get nft token id (1) and ca (SimpleNFTContractAddress)
            // approve contract to spend our token
            await SimpleNFTContract.connect(signers.deployer).approve(fheEmelMarketContractAddress, 1);

            const startTime = Math.floor(Date.now() / 1000); // start now
            const endTime = Math.floor(Date.now() / 1000) + 120; // end in 2 minutes
            await fheEmelMarketContract.connect(signers.deployer).createAuction(SimpleNFTContractAddress, 1, startTime, endTime);
            // get auction
            const auc= await fheEmelMarketContract.auctions(0);
            console.log({auc});
            expect(auc.beneficiary).to.equal(signers.deployer.address)
            // (place bid)
            // make sure user has cweth token (deposit eth to weth contract and call wrap on cweth contract, give cweth contract approval to spend our token)
             // const ethBalance = await ethers.provider.getBalance(signers.deployer.address);
            // console.log({ethBalance});
            const wethBalanceBefore = await WETH9MockContract.balanceOf(signers.deployer.address);
            await WETH9MockContract.deposit({ value: ethers.parseEther("0.5")});
            //read weth balance
            const wethBalanceAfter = await WETH9MockContract.balanceOf(signers.deployer.address);
            console.log({wethBalanceBefore})
            console.log({wethBalanceAfter})
            expect(wethBalanceAfter).to.be.gt(wethBalanceBefore);

            const cWethBalanceBefore = await CWETHContract.balanceOf(signers.deployer.address)
            await WETH9MockContract.approve(CWETHContractAddress, ethers.parseEther("0.4"))
            await CWETHContract.wrap(signers.deployer.address, ethers.parseEther("0.4"))

           //check cweth balance
           const cWethBalanceAfter = await CWETHContract.balanceOf(signers.deployer.address);
           console.log({cWethBalanceBefore});
           console.log({cWethBalanceAfter})
          
            

            // allow contract to spend our cweth (setapproval)
            const until = Math.floor(Date.now() / 1000) + 1000;
            await CWETHContract.setOperator(fheEmelMarketContractAddress, until)
            const encryptedInput = await fhevm
            .createEncryptedInput(fheEmelMarketContractAddress, signers.deployer.address)
            .add64(BigInt(ethers.parseEther("0.2")))
            .encrypt();

            await fheEmelMarketContract.connect(signers.deployer).bid(0, encryptedInput.handles[0], encryptedInput.inputProof);
            

            const auc2 = await fheEmelMarketContract.auctions(0);
            console.log({auc2})
            const highestBid = auc2.highestBid;
            console.log({highestBid})

            //read user bid value and decrypt it
            const mybid = await fheEmelMarketContract.getEncryptedBid(0, signers.deployer.address);
            console.log({mybid});
            const myDecryptedBid = await fhevm.userDecryptEuint(FhevmType.euint64, mybid.toString(), fheEmelMarketContractAddress, signers.deployer);
            console.log({myDecryptedBid})
            

        });
    });

});
