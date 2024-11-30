import React, { useState } from 'react';
import { ethers } from 'ethers';

const AIOracleDApp = () => {
    const [aiData, setAiData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    // Initialize the provider and contract
    const initializeContract = async () => {
        const _provider = new ethers.JsonRpcProvider('https://base.org');
        const _contract = new ethers.Contract(
            'YOUR_CONTRACT_ADDRESS',
            ['function requestAIData() public', 'event DataReceived(string)'],
            _provider
        );
        setProvider(_provider);
        setContract(_contract);
    };

    // Call the smart contract to get AI data
    const requestAIData = async () => {
        setLoading(true);
        await contract.requestAIData();
    };

    // Listen to the event
    const listenToEvent = async () => {
        contract.on('DataReceived', (data) => {
            setAiData(data);
            setLoading(false);
        });
    };

    return (
        <div>
            <h1>AI Oracle dApp</h1>
            <button onClick={initializeContract}>Initialize Contract</button>
            <button onClick={requestAIData} disabled={loading}>Request AI Data</button>
            {loading && <p>Loading...</p>}
            {aiData && <p>AI Data: {aiData}</p>}
        </div>
    );
};

export default AIOracleDApp;
