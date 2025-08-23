import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;

  const { deployer } = await getNamedAccounts();

  let wethAddress: string;

  // Get the underlying WETH address
  // For local/hardhat networks, use WETH9Mock
  // if (hre.network.name === "localhost" || hre.network.name === "hardhat") {
//   const wethMock = await get("WETH9Mock");
//   wethAddress = wethMock.address;
  // } else if (hre.network.name === "sepolia") {
  //   // Real WETH address on Sepolia

    wethAddress = "0x2ac4A4358235C61e36e12c75416dcbc8904476A2";

 
  // Deploy cWETH
  const cweth = await deploy("cWETH", {
    from: deployer,
    args: [wethAddress],
    log: true,
    deterministicDeployment: false,
  });

  console.log(`cWETH deployed to: ${cweth.address}`);
  console.log(`Underlying WETH token: ${wethAddress}`);
};

export default func;
func.tags = ["cweth"];
func.dependencies = ["weth"]; // Ensure WETH9Mock is deployed first

// cweth address = 0xc87bf1921425FA34398Cc98e105DA889806024CB
