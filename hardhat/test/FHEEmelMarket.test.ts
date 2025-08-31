// import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
// import { ethers, fhevm } from "hardhat";
// import { SimpleNFT, SimpleNFT__factory } from "../types";
// import { WETH9Mock, WETH9Mock__factory } from "../types";
// import { CWETH, CWETH__factory } from "../types";
// import { FHEEmelMarket, FHEEmelMarket__factory } from "../types";
// import { expect } from "chai";
// import { FhevmType } from "@fhevm/hardhat-plugin";
// import { time } from "@nomicfoundation/hardhat-network-helpers"
// import * as hre from "hardhat";

// type Signers = {
//   deployer: HardhatEthersSigner;
//   acc1: HardhatEthersSigner;
//   acc2: HardhatEthersSigner;
//   acc3: HardhatEthersSigner;
// };


// async function deployFixture() {

//     const SimpleNFTFactory = (await ethers.getContractFactory("SimpleNFT")) as SimpleNFT__factory;
//     const SimpleNFTContract = await SimpleNFTFactory.deploy();
//     const SimpleNFTContractAddress = await SimpleNFTContract.getAddress();

//     const WETH9MockFactory = (await ethers.getContractFactory("WETH9Mock")) as WETH9Mock__factory;
//     const WETH9MockContract = await WETH9MockFactory.deploy();
//     const WETH9MockContractAddress = await WETH9MockContract.getAddress();

//     const CWETHFactory = (await ethers.getContractFactory("CWETH")) as CWETH__factory;
//     const CWETHContract = await CWETHFactory.deploy(WETH9MockContractAddress); 
//     const CWETHContractAddress = await CWETHContract.getAddress();

//     const FHEEmelMarketFactory = (await ethers.getContractFactory("FHEEmelMarket")) as FHEEmelMarket__factory;
//     const fheEmelMarketContract = await FHEEmelMarketFactory.deploy(CWETHContractAddress); 
//     const fheEmelMarketContractAddress = await fheEmelMarketContract.getAddress();

//     return { 
//         SimpleNFTContract,
//         SimpleNFTContractAddress,
//         WETH9MockContract,
//         WETH9MockContractAddress,
//         CWETHContract,
//         CWETHContractAddress, 
//         fheEmelMarketContract,
//         fheEmelMarketContractAddress,  
//   };
// }

// describe("FHEEmelMarket Test", function () {
//     let signers: Signers;
//     let fheEmelMarketContract: FHEEmelMarket;
//     let fheEmelMarketContractAddress: string;
//     let CWETHContract: CWETH;
//     let CWETHContractAddress: string;
//     let WETH9MockContract: WETH9Mock;
//     let WETH9MockContractAddress: string;
//     let SimpleNFTContract: SimpleNFT;
//     let SimpleNFTContractAddress: string;

//     before(async function () {
//         const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
//         signers = { 
//         deployer: ethSigners[0], 
//         acc1: ethSigners[1], 
//         acc2: ethSigners[2], 
//         acc3: ethSigners[3] 
//         };
//     });

//     beforeEach(async () => {
//         // Check if running in FHEVM mock environment
//         if (!fhevm.isMock) {
//             throw new Error(`This hardhat test suite can only run in FHEVM mock environment`);
//         }
//         ({ 
//             fheEmelMarketContract, 
//             fheEmelMarketContractAddress, 
//             CWETHContract, 
//             CWETHContractAddress,
//             WETH9MockContract,
//             WETH9MockContractAddress,
//             SimpleNFTContract,
//             SimpleNFTContractAddress
//         } = await deployFixture());
//     });

//     describe("Contract Deployment and Initialization", function () {
//         it("should deploy contract correctly", async function () {
//             console.log(SimpleNFTContractAddress)
//             expect(SimpleNFTContractAddress).to.be.a('string');
//         });
//     });
//     describe("Create Auction", function () {
//         it("mints nft, create auction, place bid", async function () {
//             // mint nft
//             await SimpleNFTContract.connect(signers.deployer).mint("akabekechua");
//             await SimpleNFTContract.connect(signers.acc1).mint("akabekechua");
//             // get nft token id (1) and ca (SimpleNFTContractAddress)
//             // approve contract to spend our token
//             await SimpleNFTContract.connect(signers.deployer).approve(fheEmelMarketContractAddress, 1);
//             await SimpleNFTContract.connect(signers.acc1).approve(fheEmelMarketContractAddress, 2);

//             const startTime = Math.floor(Date.now() / 1000); // start now
//             const endTime = Math.floor(Date.now() / 1000) + 120; // end in 2 minutes
//             await fheEmelMarketContract.connect(signers.deployer).createAuction(SimpleNFTContractAddress, 1, startTime, endTime);

//             // get auction
//             const auc= await fheEmelMarketContract.auctions(0);
//             console.log({auc});
//             expect(auc.beneficiary).to.equal(signers.deployer.address)
//             // (place bid)
//             // make sure user has cweth token (deposit eth to weth contract and call wrap on cweth contract, give cweth contract approval to spend our token)
//              // const ethBalance = await ethers.provider.getBalance(signers.deployer.address);
//             // console.log({ethBalance});
//             const wethBalanceBefore = await WETH9MockContract.balanceOf(signers.deployer.address);
//             await WETH9MockContract.deposit({ value: ethers.parseEther("0.5")});
//             await WETH9MockContract.connect(signers.acc1).deposit({ value: ethers.parseEther("0.8")});
//             //read weth balance
//             const wethBalanceAfter = await WETH9MockContract.balanceOf(signers.deployer.address);
//             console.log({wethBalanceBefore})
//             console.log({wethBalanceAfter})
//             expect(wethBalanceAfter).to.be.gt(wethBalanceBefore);

//             const cWethBalanceBefore = await CWETHContract.balanceOf(signers.deployer.address);
//             await fhevm.awaitDecryptionOracle();
    

//             await WETH9MockContract.approve(CWETHContractAddress, ethers.parseEther("0.5"))
//             await CWETHContract.wrap(signers.deployer.address, ethers.parseEther("0.5"));

//             await WETH9MockContract.connect(signers.acc1).approve(CWETHContractAddress, ethers.parseEther("0.8"))
//             await CWETHContract.connect(signers.acc1).wrap(signers.acc1.address, ethers.parseEther("0.8"));

//            //check cweth balance
//            const cWethBalanceAfter = await CWETHContract.balanceOf(signers.deployer.address);
//            console.log({cWethBalanceBefore});
//            console.log({cWethBalanceAfter})
          
//            /////////////////////////////////////////
//             const encryptedBalance = await CWETHContract.balanceOf(signers.acc1.address);
//             const b = await fhevm.userDecryptEuint(FhevmType.euint64, encryptedBalance, CWETHContractAddress, signers.acc1);
            

//              // Wait for FHEVM decryption oracle to complete all decryption requests
//             await fhevm.awaitDecryptionOracle();
//             console.log({b});
//             ///////////////////////////////////////////////////////////////////////////
            

//             // allow contract to spend our cweth (setapproval)
//             const until = Math.floor(Date.now() / 1000) + 100000;
//              console.log({until});

//             //1
//             await CWETHContract.setOperator(fheEmelMarketContractAddress, until);
//             const encryptedInput = await fhevm
//             .createEncryptedInput(fheEmelMarketContractAddress, signers.deployer.address)
//             .add64(BigInt(ethers.parseEther("0.2")))
//             .encrypt();

//             await fheEmelMarketContract.connect(signers.deployer).bid(0, encryptedInput.handles[0], encryptedInput.inputProof);

//                         //2
//             await CWETHContract.connect(signers.acc1).setOperator(fheEmelMarketContractAddress, until)
//             const encryptedInput2 = await fhevm
//             .createEncryptedInput(fheEmelMarketContractAddress, signers.acc1.address)
//             .add64(BigInt(ethers.parseEther("0.3")))
//             .encrypt();

//             await fheEmelMarketContract.connect(signers.acc1).bid(0, encryptedInput2.handles[0], encryptedInput2.inputProof);


//             /////////////////////////////////////////
//             const encryptedBalance2 = await CWETHContract.balanceOf(signers.acc1.address);
//             const b2 = await fhevm.userDecryptEuint(FhevmType.euint64, encryptedBalance2, CWETHContractAddress, signers.acc1);
            

//              // Wait for FHEVM decryption oracle to complete all decryption requests
//             await fhevm.awaitDecryptionOracle();
//             console.log({b2});
//             ///////////////////////////////////////////////////////////////////////////


    
//             const auc2 = await fheEmelMarketContract.auctions(0);
//             console.log({auc2})
//             // const highestBid = auc2.highestBid;
//             // console.log({highestBid})
//             // decrypt highestbid

//             //1
//             // const highestBid = await fheEmelMarketContract.getHighestBid(0);
//             // console.log({highestBid})
//             // const decryptedHighestBid = await fhevm.userDecryptEuint(FhevmType.euint64, highestBid, fheEmelMarketContractAddress, signers.deployer);
//             // console.log({ decryptedHighestBid });

//             //2
//             // get winningAddress
//             // const winningAddress = await fheEmelMarketContract.getWinningAddress(0);
//             // console.log({winningAddress})
//             // const decryptedWinningAddress = await fhevm.userDecryptEaddress(winningAddress, fheEmelMarketContractAddress, signers.deployer);
//             // console.log({ decryptedWinningAddress });


//             //3
//             // rdecrypt user bid and read it
//             // let tx = await fheEmelMarketContract.decryptUserBid(0);
//             // await tx.wait();
//             // await fhevm.awaitDecryptionOracle();

//             const encryptedBid = await fheEmelMarketContract.getEncryptedBid(0, signers.deployer.address);
//             console.log({ encryptedBid });
//             const decryptedBid = await fhevm.userDecryptEuint(FhevmType.euint64, encryptedBid, fheEmelMarketContractAddress, signers.deployer);

//              // Wait for FHEVM decryption oracle to complete all decryption requests
//             await fhevm.awaitDecryptionOracle();
            
//             console.log({decryptedBid});

            


//             // remove
//             // const myDecryptedBid = await fhevm.userDecryptEuint(FhevmType.euint64, mybid, fheEmelMarketContractAddress, signers.deployer);
//             // console.log({myDecryptedBid});
           
            

//             // decryptWinningAddress and set it to winner address
//             //
//             await time.increase(3 * 60);
//             let tx2 = await fheEmelMarketContract.decryptWinningAddress(0);
//             let receipt = await tx2.wait();
  
//             // Wait for FHEVM decryption oracle to complete all decryption requests
//             await fhevm.awaitDecryptionOracle();

//             let tx3 = await fheEmelMarketContract.resolveAndRefundLosers(0);
//             const winner = (await fheEmelMarketContract.auctions(0)).winnerAddress;
//             console.log({winner});
//             // // get auction again
//             const auc3 = await fheEmelMarketContract.getBidders(0);
//             console.log({auc3})

    


//         });
//     });

// });


import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm } from "hardhat";
import { SimpleNFT, SimpleNFT__factory } from "../types";
// import { WETH9Mock, WETH9Mock__factory } from "../types";
// import { CWETH, CWETH__factory } from "../types";
import { ConfidentialWETH,  ConfidentialWETH__factory} from "../types";
import { FHEEmelMarket, FHEEmelMarket__factory } from "../types";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";
import { time } from "@nomicfoundation/hardhat-network-helpers"
import * as hre from "hardhat";

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


    const CWETHFactory = (await ethers.getContractFactory("ConfidentialWETH")) as ConfidentialWETH__factory;
    const CWETHContract = await CWETHFactory.deploy(); 
    const CWETHContractAddress = await CWETHContract.getAddress();

    const FHEEmelMarketFactory = (await ethers.getContractFactory("FHEEmelMarket")) as FHEEmelMarket__factory;
    const fheEmelMarketContract = await FHEEmelMarketFactory.deploy(CWETHContractAddress); 
    const fheEmelMarketContractAddress = await fheEmelMarketContract.getAddress();

    return { 
        SimpleNFTContract,
        SimpleNFTContractAddress,
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
    let CWETHContract: ConfidentialWETH;
    let CWETHContractAddress: string;
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
            await SimpleNFTContract.connect(signers.acc1).mint("akabekechua");
            // get nft token id (1) and ca (SimpleNFTContractAddress)
            // approve contract to spend our token
            await SimpleNFTContract.connect(signers.deployer).approve(fheEmelMarketContractAddress, 1);
            await SimpleNFTContract.connect(signers.acc1).approve(fheEmelMarketContractAddress, 2);

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
            const cwethBalanceBefore = await CWETHContract.balanceOf(signers.deployer.address);
            await CWETHContract.deposit(signers.deployer.address, { value: ethers.parseEther("0.5")});
            await CWETHContract.connect(signers.acc1).deposit(signers.acc1.address, { value: ethers.parseEther("0.8")});
            //read cweth balance
            const cwethBalanceAfter = await CWETHContract.balanceOf(signers.deployer.address);
            console.log({cwethBalanceBefore});
            console.log({cwethBalanceAfter});
            // expect(cwethBalanceAfter).to.be.gt(cwethBalanceBefore);

            // await fhevm.awaitDecryptionOracle();
          
           /////////////////////////////////////////
            const encryptedBalance1 = await CWETHContract.balanceOf(signers.acc1.address);
            const b = await fhevm.userDecryptEuint(FhevmType.euint64, encryptedBalance1, CWETHContractAddress, signers.acc1);
            

             // Wait for FHEVM decryption oracle to complete all decryption requests
            await fhevm.awaitDecryptionOracle();
            console.log({b});
            ///////////////////////////////////////////////////////////////////////////
            

            // allow contract to spend our cweth (setapproval)
            const until = Math.floor(Date.now() / 1000) + 100000;
             console.log({until});

            //1
            await CWETHContract.setOperator(fheEmelMarketContractAddress, until);
            const encryptedInput = await fhevm
            .createEncryptedInput(fheEmelMarketContractAddress, signers.deployer.address)
            .add64(BigInt(ethers.parseEther("0.2")))
            .encrypt();

            await fheEmelMarketContract.connect(signers.deployer).bid(0, encryptedInput.handles[0], encryptedInput.inputProof);

                        //2
            await CWETHContract.connect(signers.acc1).setOperator(fheEmelMarketContractAddress, until)
            const encryptedInput2 = await fhevm
            .createEncryptedInput(fheEmelMarketContractAddress, signers.acc1.address)
            .add64(BigInt(ethers.parseEther("0.3")))
            .encrypt();

            await fheEmelMarketContract.connect(signers.acc1).bid(0, encryptedInput2.handles[0], encryptedInput2.inputProof);


            /////////////////////////////////////////
            const encryptedBalance2 = await CWETHContract.balanceOf(signers.acc1.address);
            const b2 = await fhevm.userDecryptEuint(FhevmType.euint64, encryptedBalance2, CWETHContractAddress, signers.acc1);
            

             // Wait for FHEVM decryption oracle to complete all decryption requests
            await fhevm.awaitDecryptionOracle();
            console.log({b2});
            ///////////////////////////////////////////////////////////////////////////


    
            const auc2 = await fheEmelMarketContract.auctions(0);
            console.log({auc2})
            // const highestBid = auc2.highestBid;
            // console.log({highestBid})
            // decrypt highestbid

            //1
            // const highestBid = await fheEmelMarketContract.getHighestBid(0);
            // console.log({highestBid})
            // const decryptedHighestBid = await fhevm.userDecryptEuint(FhevmType.euint64, highestBid, fheEmelMarketContractAddress, signers.deployer);
            // console.log({ decryptedHighestBid });

            //2
            // get winningAddress
            // const winningAddress = await fheEmelMarketContract.getWinningAddress(0);
            // console.log({winningAddress})
            // const decryptedWinningAddress = await fhevm.userDecryptEaddress(winningAddress, fheEmelMarketContractAddress, signers.deployer);
            // console.log({ decryptedWinningAddress });


            //3
            // rdecrypt user bid and read it
            // let tx = await fheEmelMarketContract.decryptUserBid(0);
            // await tx.wait();
            // await fhevm.awaitDecryptionOracle();

            const encryptedBid = await fheEmelMarketContract.getEncryptedBid(0, signers.deployer.address);
            console.log({ encryptedBid });
            const decryptedBid = await fhevm.userDecryptEuint(FhevmType.euint64, encryptedBid, fheEmelMarketContractAddress, signers.deployer);

             // Wait for FHEVM decryption oracle to complete all decryption requests
            await fhevm.awaitDecryptionOracle();
            
            console.log({decryptedBid});

            


            // remove
            // const myDecryptedBid = await fhevm.userDecryptEuint(FhevmType.euint64, mybid, fheEmelMarketContractAddress, signers.deployer);
            // console.log({myDecryptedBid});
           
            

            // decryptWinningAddress and set it to winner address
            //
            await time.increase(3 * 60);
            let tx2 = await fheEmelMarketContract.decryptWinningAddress(0);
            let receipt = await tx2.wait();
  
            // Wait for FHEVM decryption oracle to complete all decryption requests
            await fhevm.awaitDecryptionOracle();

            let tx3 = await fheEmelMarketContract.resolveAndRefundLosers(0);
            const winner = (await fheEmelMarketContract.auctions(0)).winnerAddress;
            console.log({winner});
            // // get auction again
            const auc3 = await fheEmelMarketContract.getBidders(0);
            console.log({auc3})

    


        });
    });

});

