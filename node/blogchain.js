const Web3 = require('web3');
const TruffleContract = require('truffle-contract');
const BigNumber = require('bignumber.js');

const contractJson = require('../truffle/build/contracts/BlogChain.json');

const getWeb3Provider = () => {
  if (typeof web3 !== 'undefined') {
    // Is there an injected web3 instance?
    web3Provider = web3.currentProvider;
  } else {
    // If no injected web3 instance is detected, fall back to Ganache
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }
  return web3Provider;
}

const getWeb3 = () => {
  web3 = new Web3(getWeb3Provider());
  return web3;
};

const getContract = () => {
  const contract = TruffleContract(contractJson);
  contract.setProvider(new Web3.providers.HttpProvider('http://localhost:7545'));
  if (typeof contract.currentProvider.sendAsync !== "function") {
    contract.currentProvider.sendAsync = function() {
      return contract.currentProvider.send.apply(
        contract.currentProvider, arguments
      );
    };
  }
  return contract;
};

const loadPost = (post) => {
  return {
    id: BigNumber(post[0]).toNumber(),
    owner: post[1],
    title: post[2],
    content: post[3]
  };
};

module.exports = {
  getWeb3Provider,
  getWeb3,
  getContract,
  loadPost
};