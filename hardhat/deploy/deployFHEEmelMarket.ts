import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  let cwethAddress: string;

  cwethAddress = "";


  const fheEmelMarket = await deploy("FHEEmelMarket", {
    from: deployer,
    args: [cwethAddress],
    log: true,
    deterministicDeployment: false,
  });

  console.log(`Deployer Address: ${deployer}`)
  console.log(`FHEEmelMarket deployed to: ${fheEmelMarket.address}`);
  // }
  
};

export default func;
func.tags = ["fheEmelMarket"];

// npx hardhat deploy --network sepolia --tags fheEmelMarket
// fheEmelMarket address = 0xa592C283b5d389E2e52d5363320448E95B75b838
