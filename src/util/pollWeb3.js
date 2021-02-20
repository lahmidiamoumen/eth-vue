import Web3 from 'web3'
import store   from '../store'

let pollWeb3 =  (state) => {
  let coinbase = state && state.web3 ? state.web3.coinbase : "";

  let web3 = window.web3
  let isLocalWeb3 = false

  if (typeof web3 !== "undefined" && web3) {
    // Use Mist/MetaMask's provider
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  } else {
    console.log("monitorWeb3: No web3 in browser");
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    isLocalWeb3 = true;
  }

  setInterval(() => {
    if (web3 && !isLocalWeb3 && store.state.web3.coinbase ) {
      
      let newCoinbase = web3.eth.coinbase
      if (newCoinbase && newCoinbase !== coinbase) {
        web3.eth.getBalance(newCoinbase, (err, newBalance) => {
          if (err) {
            console.log(err)
          } else {
            store.dispatch('pollWeb3', {
              coinbase: newCoinbase,
              balance: parseInt(newBalance, 10)
            })
          }
        })
      } else {
        web3.eth.getBalance(store.state.web3.coinbase, (err, polledBalance) => {
          if (err) {
            console.log(err)
          } else if (parseInt(polledBalance, 10) !== store.state.web3.balance) {
            console.log("coinbase from stat")
            store.dispatch('pollWeb3', {
              coinbase: store.state.web3.coinbase,
              balance: polledBalance
            })
          }
        })
      }
    }
  }, 500)
}

export default pollWeb3