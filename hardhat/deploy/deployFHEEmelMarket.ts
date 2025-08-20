import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  let cwethAddress: string;

  cwethAddress = "0xc87bf1921425FA34398Cc98e105DA889806024CB";

  // Deploy WETH9Mock (only for local/hardhat networks if you want to conditionally deploy)
  // if (hre.network.name === "localhost" || hre.network.name === "hardhat") {
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

// fheEmelMarket address = 0xFfF693618d1e9300bF5218DBA31a6cbDA1BCE755
