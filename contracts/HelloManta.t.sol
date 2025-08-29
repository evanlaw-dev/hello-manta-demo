// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {HelloManta} from "./HelloManta.sol";
import {Test} from "forge-std/Test.sol";

contract HelloMantaTest is Test {
    HelloManta helloManta;
    
    function setUp() public {
        helloManta = new HelloManta("Hello Manta!");
    }
    
    function test_InitialMessage() public view {
        require(
        keccak256(abi.encodePacked(helloManta.message())) ==
            keccak256(abi.encodePacked("Hello Manta!")),
        "Initial message should be 'Hello Manta!'"
        );
    }
    
    function test_SetMessage() public {
        helloManta.setMessage("Hello World!");
        require(
        keccak256(abi.encodePacked(helloManta.message())) ==
            keccak256(abi.encodePacked("Hello World!")),
        "Message should be updated to 'Hello World!'"
        );
    }

    function test_anotherMessage() public {
        helloManta.setMessage("Another message");
        require(
        keccak256(abi.encodePacked(helloManta.message())) ==
            keccak256(abi.encodePacked("Another message")),
        "Message should be updated to 'Another message'"
        );
    }
}
