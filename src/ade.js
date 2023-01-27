//require web3
const Web3 = require("web3");

//connect to RPC server
const web3 = new Web3("HTTP://127.0.0.1:7545");

//connect to Smart contract
const MyContract = require("../build/contracts/so.json")
const init = async() => {
    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(MyContract.abi, deployedNetwork.address);
    
//to read data from smart contract
    const readData = await contract.methods.getData().call();
    console.log(readData);
}
init();


/*function App(){
    const [ hasColor, setHasColor ] = useState(false);
    const [ hasName, setHasName ] = useState(true);
    const [ hasAddress, setHasAddress] = useState(true);
  
    setHasColor(true);
    setHasName(false);
    setHasAddress(false);
  
  
  }*/