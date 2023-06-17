import React, { useState, useRef } from 'react';
import { ethers } from 'ethers';
import { Result } from 'postcss';
import { parse } from '@ethersproject/transactions';
const bankJson = require('./Bank.json');

function App() {

  {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload();
      }
    });
  }

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);
  const [contract_rw, setContract_rw] = useState(null);

  const depositValue = useRef();
  const withdrawValue = useRef();

  const bankAddress = '0x5A6eC14F3Dc65097061A853cf54c1ebCde7CCF32';
  const bankAbi = bankJson.abi;

  const connectToWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      const address = await signer.getAddress();
      const bank = new ethers.Contract(bankAddress, bankAbi, provider);
      const bank_rw = new ethers.Contract(bankAddress, bankAbi, signer);

      setProvider(provider);
      setSigner(signer);
      setAddress(address);
      setContract(bank);
      setContract_rw(bank_rw);

      const result = await bank_rw.checkBalance();
      const data = ethers.utils.formatEther(result._hex);
      console.log('Result:', data);
      setBalance(data);

      console.log('Wallet connected');
    } catch (error) {
      console.log(error)
    }
  };

  const getBalance = async () => {
    try {
      console.log("async get balance called")
      const result = await contract_rw.checkBalance();
      const data = ethers.utils.formatEther(result._hex);
      console.log('Result:', data);
      // setBalance(ethers.utils.formatEther(result._hex));
      return data;
    } catch (err) {
      console.error("Error:", err);
    }
  }

  const depositEth = async () => {
    if (provider !== null) {
      const network = await provider.getNetwork();
      if (network.name !== 'goerli') {
        alert(`Please change wallet to "goerli" chain first`);
      } else {
        try {
          const result = await contract_rw.deposit({ value: ethers.utils.parseUnits(depositValue.current.value, 'ether') });
          console.log('Result:', result);
        } catch (err) {
          console.error("Error:", err);
        }
      }
    } else {
      alert(`Please connect the "wallet" first`);
    }
  }

  const withdrawEth = async () => {
    if (provider !== null) {
      const network = await provider.getNetwork();
      if (network.name !== 'goerli') {
        alert(`Please change wallet to "goerli" chain first`);
      } else {
        try {
          const result = await contract_rw.withdraw(ethers.utils.parseUnits(withdrawValue.current.value, 'ether'));
          console.log('Result:', result);
        } catch (err) {
          console.error("Error:", err);
        }
      }
    } else {
      alert(`Please connect the "wallet" first`);
    }
  }


  return (
    <div className='flex justify-center align-center'>
      <div className="w-[628px] h-[909px] mt-[143px] rounded-2xl">
        <header className="bg-[#F58216]  h-[126px] flex justify-between rounded-2xl">
          <div className='pl-[45px] pt-[36px]  font-bold'>
            <h1 className="w-[219px] h-[25px] text-white text-2xl leading-4 font-play">Decentralized Bank</h1>
            <h3 className=" h-[33px] y text-[18px] text-white leading-8 font-play">{`Balance: ${balance !== null ? balance : ``} ETH`}</h3>
          </div>
          <div className='pr-[45px] py-[40px] flex-end'>
            <button onClick={connectToWallet} className='w-[180px] h-[50px] bg-[#F7BE6D] font-semibold text-[#F05E16] hover:text-red-500 p-2 rounded-md font-play'>{provider && signer ? `Connected` : `Connet Wallet`}</button>
          </div>
        </header>

        {!provider ? null :
          <div className='flex justify-center'>
            <div className=' h-[41px] bg-[#F7BE6D] flex mt-[86px] rounded-md'>
              <div className='h-[41px] bg-[#F58216] rounded-md'>
                <h5 className='text-white px-2 py-[10px] font-play text-sm'>Connected Wallet</h5>
              </div>
              <p className='text-red-500 px-2 py-2 font-play'>{address ? address : null}</p>
            </div>
          </div>
        }

        <div className='flex flex-col space-y-16 mx-[40px] my-[70px]'>
          <div className='flex space-x-20'>
            <input type="number" ref={depositValue} placeholder="ETH Amount" className='border w-[290px] h-[50px] px-3 text-md rounded-md font-semibold' />
            <button onClick={depositEth} className='w-[180px] h-[50px] bg-[#F7BE6D] font-semibold text-[#F05E16] hover:text-red-500 p-2 rounded-md font-play'>Deposit</button>
          </div>
          <div className='flex space-x-20'>
            <input type="number" ref={withdrawValue} placeholder="ETH Amount" className='border w-[290px] h-[50px] px-3 text-md rounded-md font-semibold' />
            <button onClick={withdrawEth} className='w-[180px] h-[50px] bg-[#F7BE6D] font-semibold text-[#F05E16] hover:text-red-500 p-2 rounded-md font-play'>Withdraw</button>
          </div>
        </div>

        <div className='bg-[#F7BE6D] w-[496px] rounded-md p-4 mx-16 mt-36'>
          <p className='text-md font-play'>Our decentralized bank securely stores your ETH using smart contract, allowing you to withdraw funds whenever needed. Experience the convenience of blockchain-based banking with enhanced security and control over your assets.</p>
        </div>

      </div>

    </div>
  );
}

export default App;