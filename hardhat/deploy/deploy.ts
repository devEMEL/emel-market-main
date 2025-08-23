import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedFHECounter = await deploy("FHECounter", {
    from: deployer,
    log: true,
  });

  console.log(`FHECounter contract: `, deployedFHECounter.address);
};
export default func;
func.id = "deploy_fheCounter"; // id required to prevent reexecution
func.tags = ["FHECounter"];


// Refund bidders
// for (uint256 i = 0; i < a.bidders.length; i++) {
//     address bidder = a.bidders[i];
//     euint64 bidAmount = a.bids[bidder];
//     if (FHE.isInitialized(bidAmount)) {
//         a.bids[bidder] = FHE.asEuint64(0);

//         FHE.allowTransient(bidAmount, address(paymentToken));
//         paymentToken.confidentialTransfer(bidder, bidAmount);

//     }
// }


// artifacts/contracts/FHEEmelMarket.sol/FHEEmelMarket.json

// https://api.studio.thegraph.com/query/119165/emelmarket/v0.0.1