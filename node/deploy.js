var Web3 = require('web3');
var solc = require('solc');
var fs = require('fs');
var tx = require('ethereumjs-tx');

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/'));

deployContract();
showABI();

function deployContract() {
	web3.eth.getTransactionCount(process.env.RINKEBY_ADDRESS).then((txnCount) => {
		console.log('txn count', txnCount);
		const source = fs.readFileSync(`${__dirname}/../truffle/contracts/BlogChain.sol`);
		const compiled = solc.compile(source.toString(), 1);
		const bytecode = compiled.contracts[':BlogChain'].bytecode;
		const rawContractTx = {
			from: process.env.RINKEBY_ADDRESS,
			nonce: web3.utils.toHex(txnCount),
      gasLimit: web3.utils.toHex(4000000),
      gasPrice: web3.utils.toHex(20000000000),
      data: '0x' + bytecode
    };
    console.log('contract deploying...');
    sendRaw(rawContractTx);
	});
}

function showABI() {
  const source = fs.readFileSync(`${__dirname}/../truffle/contracts/BlogChain.sol`);
  const compiled = solc.compile(source.toString(), 1);
  const abi = compiled.contracts[':BlogChain'].interface;
  console.log('abi', abi);
}

function sendRaw(rawTx) {
  var privateKey = new Buffer(process.env.RINKEBY_KEY, 'hex');
  var transaction = new tx(rawTx);
  transaction.sign(privateKey);
  var serializedTx = transaction.serialize().toString('hex');
  web3.eth.sendSignedTransaction(
    `0x${serializedTx}`, function(err, result) {
      if (err) {
        console.log('txn err', err);
      } else {
        console.log('txn result', result);
      }
    }
  );
}
// abi
// [{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getPostCountForUser","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"index","type":"uint256"}],"name":"getPostOfUser","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getPost","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"},{"name":"_content","type":"string"}],"name":"addPost","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPostCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"content","type":"string"}],"name":"editPost","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

// txn
// 0x401acd6dce2c598f23249e151d10fde9b97ac732f690b44a1c9634dfb3a6cc09