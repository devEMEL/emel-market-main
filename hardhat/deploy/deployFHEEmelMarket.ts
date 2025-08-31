import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  let cwethAddress: string;

  cwethAddress = "0x648FdB91fF08251Be5AaC2AEaE3B0Dd8E12922d3";


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
// fheEmelMarket address = 0xE9916c794D19C7627Efc24DefF825BBD9Aa0672D
