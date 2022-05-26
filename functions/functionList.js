const ethers = require('ethers');
require('dotenv').config();

module.exports = {
    getBlock: async function (block, url) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        let res = await provider.getBlock(block);
    console.log(res);
    },
    getBalance: async function (addr, url) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        let res = await provider.getBalance(addr);
        let balance = ethers.utils.formatUnits(res, "ether");
        console.log(balance);
    },
    
    getCode: async function (addr, url) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        let res = await provider.getCode(addr);
        if (res == '0x') {
            console.log('This is not a smart contract address!');
        } else {
        console.log(res);
        }
    },
    
    getTransactionCount: async function (addr, url) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        let res = await provider.getTransactionCount(addr);
        console.log(res);
    },
    
    getBlockWithTransactions: async function (block, url) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        let res = await provider.getBlockWithTransactions(block);
        console.log(res);
    },
    
    resolveName: async function (name, url) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        let res = await provider.resolveName(name);
        console.log(res);
    },
    
    getBlockNumber: async function (url) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        let res = await provider.getBlockNumber();
        console.log(res);
    },
    
    getGasPrice: async function (url) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        let gasPrice = await provider.getGasPrice();
        let gweiGasPrice = ethers.utils.formatUnits(gasPrice, "gwei");
        console.log(gweiGasPrice);
    },
    
    getFeeData: async function (url) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        let feeData = await provider.getFeeData();
        let gasPriceGwei = ethers.utils.formatUnits(feeData.gasPrice, "gwei");
        let feeDataGwei = ethers.utils.formatUnits(feeData.maxFeePerGas, "gwei");
        let maxPriorityFeePerGasGwei = ethers.utils.formatUnits(feeData.maxPriorityFeePerGas, "gwei");
        console.log(gasPriceGwei, feeDataGwei, maxPriorityFeePerGasGwei);
    },
    
    getTransaction: async function (hash, url) {
        const provider = new ethers.providers.JsonRpcProvider(url);
        let res = await provider.getTransaction(hash);
        console.log(res);
    },

    returnNetwork: function (network) {
        if (network == 0) {
            return process.env.HOMESTEAD_URL;
        }
        if (network == 1) {
            return process.env.RINKEBY_URL;
        }
        if (network == 2) {
            return process.env.GOERLI_URL;
        }
    }
}