// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract HelloManta {
    string public message;

    constructor(string memory _message){
        message = _message;
    }

    function setMessage(string memory _message) external {
        message = _message;
    }
}

