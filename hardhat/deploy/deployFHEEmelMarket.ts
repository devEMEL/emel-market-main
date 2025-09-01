import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  let cwethAddress: string;

  cwethAddress = "0xA3b95080674fBd12fC3626046DCa474c48d012d8";


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
// fheEmelMarket address = 0xA8B39ecfbB39c6749C8BA40ee9d349aB844F93cE
