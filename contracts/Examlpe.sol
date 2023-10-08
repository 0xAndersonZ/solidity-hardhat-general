// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Example is Ownable {
    uint256 public value;

    function setValue(uint256 _value) external onlyOwner {
        value = _value;
    }
}
