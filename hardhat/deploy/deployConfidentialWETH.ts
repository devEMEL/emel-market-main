import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

 
  // Deploy cWETH
  const cweth = await deploy("ConfidentialWETH", {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
  });

  console.log(`CWETH deployed to: ${cweth.address}`);
};

export default func;
func.tags = ["cweth"];

// npx hardhat deploy --network sepolia --tags cweth
// cweth address = 0x648FdB91fF08251Be5AaC2AEaE3B0Dd8E12922d3
