const ethers = require('ethers');
const prompts = require('prompts');
const { getBlock, getGasPrice, getFeeData, getCode, getTransactionCount, resolveName, getTransaction, getBlockWithTransactions, getBlockNumber, getBalance, returnNetwork } = require('./functions/functionList.js');
require('dotenv').config();

    // const privateKey = process.env.RINKEBY_PRIVATE_KEY; 
    // const wallet = new ethers.Wallet(privateKey, provider);

const functionArr = [getBalance, getBlock, getBlockNumber, getBlockWithTransactions, getCode, getFeeData, getGasPrice, getTransaction, getTransactionCount, resolveName];

const networkSelections = {
    type: 'select',
    name: 'network',
    message: 'Please Select a Network',
    choices: [
        { title: 'Mainnet', description: 'Main Ethereum Network'},
        { title: 'Rinkeby', description: 'Rinkeby Test Network'},
        { title: 'Goerli', description: 'Goerli Test Network'},
        { title: 'None', description: 'End Program'},
    ],
    initial: 0,
}

const blockQuestions = {
    type: 'text',
    name: 'block',
    message: 'Please Enter Block Hash',
    initial: 'Hit Enter for Most Recent Block'
}

const addressQuestions = {
    type: 'text',
    name: 'address',
    message: 'Please Enter Address',
}

const transactionQuestions = {
    type: 'text',
    name: 'hash',
    message: 'Please Enter Transaction Hash',
}

const domainQuestions = {
    type: 'text',
    name: 'domain',
    message: 'Please Enter ENS Domain',
}

const domainPrompt = async (url, fnNum) => {
    const response = await prompts(domainQuestions);
    let domain = response.domain;
    console.log('Searching for Domain Name...');
    await functionArr[fnNum](domain, url);
}

const transactionPrompt = async (url, fnNum) => {
    const response = await prompts(transactionQuestions);
    let hash = response.hash;
    console.log('Getting Transaction Info...');
    await functionArr[fnNum](hash, url);
}

const addressPrompt = async (url, fnNum) => {
    const response = await prompts(addressQuestions);
    let address = response.address;
    console.log('Getting Account Info...');
    await functionArr[fnNum](address, url);
}

const blockPrompt = async (url, fnNum) => {
    const response = await prompts(blockQuestions);
    let hash = response.block;
    console.log('Getting Block Info...');
    if (hash.length > 34) {
    await functionArr[fnNum](hash, url);
    } else {
        await functionArr[fnNum](null, url);
    }
}

const functionSelections =
    {
        type: 'select',
        name: 'function',
        message: 'Please Select a Function. Press ESC to Exit',
        choices: [
          { title: 'Account Balance', description: 'Balance in ETH of a given account' },
          { title: 'Block Info', description: 'Information about a given block' },
          { title: 'Block Number', description: 'Block number of latest block' },
          { title: 'Block Info Including Transactions', description: 'Info and transaction info about a given block' },
          { title: 'Smart Contract Code', description: 'Smart contract code of a given address' },
          { title: 'Current Gas Fee Info', description: 'Various current gas fee information' },
          { title: 'Current Gas Price', description: 'Current gas price' },
          { title: 'Transaction Lookup', description: 'Information about a given transaction' },
          { title: 'Transaction Count for Account', description: 'Total number of SENT transactions from a given address' },
          { title: 'ENS Address Lookup', description: 'Find address for a given ENS name' },
          { title: 'None', description: 'End Program' },
        ],
        initial: 0,
    };

const functions = async (url) => {
    const functionSelect = await prompts(functionSelections);
    const functionNumber = functionSelect.function;
    if (functionNumber == 1 || functionNumber == 3) {
        await blockPrompt(url, functionNumber);
        await functions(url);
    };
    if (functionNumber == 0 || functionNumber == 4 || functionNumber == 8) {
        await addressPrompt(url, functionNumber);
        await functions(url);
    };
    if (functionNumber == 7) {
        await transactionPrompt(url, functionNumber);
        await functions(url);
    };
    if (functionNumber == 2 || functionNumber == 5 || functionNumber == 6) {
        console.log('Gathering Blockchain Info...');
        await functionArr[functionNumber](url);
        await functions(url);
    }
    if (functionNumber == 9) {
        await domainPrompt(url, functionNumber);
        await functions(url);
    }
    if (functionNumber == 10) {
        console.log('Program Ended');
    }
}

const main = async () => {
    let url = "";
    const onSubmit = (prompt, answer) => {
        if (answer == 3) {
            console.log('No Network Selected. Program Ended');
        } else {
        console.log(`${prompt.choices[answer].title} Network Selected.`);
        const network = returnNetwork(answer);
        url = network;
        }
    }
    const networkSelect = await prompts(networkSelections, { onSubmit });
        if (networkSelect.network < 3) {
            await functions(url);
    }
};

main();

