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

// npx hardhat deploy --network sepolia --tags nft
// nft address = 0xfe21a6188cDcdEe32Dc79cA56F5BE48F9A45022B
