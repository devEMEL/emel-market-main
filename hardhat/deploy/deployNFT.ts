import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();


  // Deploy NFT
  const nft = await deploy("SimpleNFT", {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
  });

  console.log(`NFT deployed to: ${nft.address}`);
};

export default func;
func.tags = ["nft"];

// nft address = 0x000a90dAF3f051bA56bbB6597CEdfFf14da1d582
