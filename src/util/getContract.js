import Web3 from 'web3'
import {address, ABI} from './constants/const'

let getContract = new Promise(function (resolve, reject) {
    if(window.web3){
        let web3 = new Web3(window.ethereum)
        let casinoContractInstance = new web3.eth.Contract( ABI,address)
        // casinoContractInstance = () => casinoContractInstance
        resolve(casinoContractInstance)
    }else{
        reject({
            result: null,
            err: "Unable to connect to Web3"
        })
    }
    
})

export default getContract