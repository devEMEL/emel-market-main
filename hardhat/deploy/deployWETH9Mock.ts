import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // Deploy WETH9Mock (only for local/hardhat networks if you want to conditionally deploy)
  // if (hre.network.name === "localhost" || hre.network.name === "hardhat") {
  const weth = await deploy("WETH9Mock", {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
  });

  console.log(`Deployer Address: ${deployer}`)
  console.log(`WETH9Mock deployed to: ${weth.address}`);
  // }
};

export default func;
func.tags = ["weth"];

// npx hardhat deploy --network sepolia --tags weth