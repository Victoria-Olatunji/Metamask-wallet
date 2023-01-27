import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import logo from './logo.svg';
import './App.css';

function App(){
  const [ haveMetamask, setHaveMetamask ] = useState(true);
  const [ isConnected, setIsConnected ] = useState(false);
  const [ accountAddress, setAccountAddress] = useState('');
  const [ accountBalance, setAccountBalance] = useState('');

  const { ethereum } = window;
  
  //set provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {

    const checkMetamaskAvailability = async() => {
      if(!ethereum) {
        setHaveMetamask(false);
      }else{
        setHaveMetamask(true);
      }
    }
    checkMetamaskAvailability();
  }, []);
  const connectWallet = async() => {
    try {
      if(!ethereum) {
        setHaveMetamask(false);
      }else{
        const accounts = await ethereum.request({ method: 'eth_requestAccounts'});

        let balance = await provider.getBalance(accounts[0]);
        let bal = ethers.utils.formatEther(balance);
        setAccountAddress(accounts[0]);
        setAccountBalance(bal);
        setIsConnected(true);
      }
    }catch(error) {
      setIsConnected(false);
    }

    return (
      <div className="App">
        <header className="App-header">
          {haveMetamask ? (
            <div className="App-header">
              {isConnected ? (
                <div className="card">
                  <div className="card-row">
                    <h3>Wallet Address:</h3>
                    <p>
                      {accountAddress} 
                    </p>
                  </div>
                  <div className="card-row">
                    <h3>Wallet Balance:</h3>
                    <p>{accountBalance}</p>
                  </div>
                </div>
              ) : (
                <img src={logo} className="App-logo" alt="logo" />
              )}
              {isConnected ? (
                <p className="info">🎉 Connected Successfully</p>
              ) : (
                <button className="btn" style={{backgroundColor: "red"}} background onClick={connectWallet}>
                  Connect
                </button>
              )}
            </div>
          ) : (
            <p>Please Install MataMask</p>
          )}
        </header>
      </div>
    )  
  }
}
export default App;