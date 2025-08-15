// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ConfidentialFungibleTokenERC20Wrapper} from "@openzeppelin/contracts-confidential/token/extensions/ConfidentialFungibleTokenERC20Wrapper.sol";
import {ConfidentialFungibleToken} from "@openzeppelin/contracts-confidential/token/ConfidentialFungibleToken.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";


/// @title cWETH - Confidential WETH Token
/// @notice A confidential ERC20 token wrapped around regular WETH using FHE
contract cWETH is ConfidentialFungibleTokenERC20Wrapper, SepoliaConfig {
    /// @notice Constructor to initialize the confidential WETH token
    /// @param underlyingToken The address of the underlying WETH token
    constructor(IERC20 underlyingToken)
        ConfidentialFungibleTokenERC20Wrapper(underlyingToken)
        ConfidentialFungibleToken("Confidential Wrapped ETH", "cWETH", "")
    {

    }

    /// @notice Override decimals to return 18 for WETH compatibility
    /// @return The number of decimals (18 for WETH)
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}



