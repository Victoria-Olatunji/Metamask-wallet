//1.require web3
const Web3 = require("web3");

//2.connect to rpc server (connecting to Ganache(local blockchain))
const web3 = new Web3("HTTP://127.0.0.1:7545");

//console.log(web3);

//3a.require all Json file to get abi
const MyContract = require('../build/contracts/so.json');

//3b.get id of the network 
const init = async() => {

const id = await web3.eth.net.getId();

const deployedNetwork = MyContract.networks[id];

//console.log(id);

//3.connect to our smart contract

const contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address);
//console.log(contract);

//to read data from smart contract
const read = await contract.methods.getData().call();

const accounts = await web3.eth.getAccounts();

//to write data to smartcontract
const Send = await contract.methods.setData(50).send({from:accounts[0]});

//to read data from smart contract again
const ReadAgain = await contract.methods.getData().call();
console.log(ReadAgain);
}
init();