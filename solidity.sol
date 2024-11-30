//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the interface for ORA's AI Oracle (replace with actual import)
import "@ora/ai-oracle/contracts/OracleInterface.sol";

contract AIOracleDApp {

    OracleInterface aiOracle; // Declare the AI Oracle contract instance
    address public owner;
    
    event DataReceived(string aiData);

    // Constructor to set the AI Oracle contract address
    constructor(address _aiOracleAddress) {
        aiOracle = OracleInterface(_aiOracleAddress);
        owner = msg.sender;
    }

    // Function to request AI data from the oracle
    function requestAIData() public {
        // Example: Call to AI Oracle to get the data
        string memory aiResult = aiOracle.getData();

        // Emit the result
        emit DataReceived(aiResult);

        // You can now use the AI result in your contract logic
    }

    // Function to withdraw funds (if necessary)
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Accept Ether into the contract
    receive() external payable {}
}
