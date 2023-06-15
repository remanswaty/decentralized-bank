import React, { useState } from 'react';
import { ethers } from 'ethers';


function App() {

  return (
    <div className='flex justify-center align-center'>
      <div className="w-[628px] h-[909px] mt-[143px] rounded-2xl">

        <header className="bg-[#F58216] w-[627px] h-[126px] flex justify-between rounded-2xl">
          <div className='pt-[36px] pl-[52px] font-bold'>
            <h1 className="w-[219px] h-[25px] text-white text-2xl leading-4 font-play">Decentralized Bank</h1>
            <h3 className="w-[155px] h-[33px] y text-[18px] text-white leading-8 font-play">Balance: 2.5ETH</h3>
          </div>
          <div className='pr-[52px] py-[40px]'>
            <button className='w-[180px] h-[50px] bg-[#F7BE6D] font-semibold text-[#F05E16] hover:text-red-500 p-2 rounded-md font-play'>Connect Wallet</button>
          </div>
        </header>

        <div className=' h-[41px] bg-[#F7BE6D] margin flex mt-[86px] mx-[40px] rounded-md'>
            <div className='h-[41px] w-[30%] bg bg-[#F58216] rounded-md'>
              <h5 className='text-white px-4 py-[10px] font-play text-sm '>Connected Wallet</h5>
            </div>
            <p className='text-red-500 px-4 py-2 font-play'>0xd745fBB6007aab1C378eF7ff85c3E91ffcc89998 </p>
        </div>

        <div className='flex flex-col space-y-16 mx-[40px] my-[70px]'>
          <div className='flex space-x-20'>
            <input type="number" placeholder="ETH Amount" className='border w-[290px] h-[50px] px-3 text-md rounded-md font-semibold'/>
            <button className='w-[180px] h-[50px] bg-[#F7BE6D] font-semibold text-[#F05E16] hover:text-red-500 p-2 rounded-md font-play'>Deposit</button>
          </div>
          <div className='flex space-x-20'>
            <input type="number" placeholder="ETH Amount" className='border w-[290px] h-[50px] px-3 text-md rounded-md font-semibold'/>
            <button className='w-[180px] h-[50px] bg-[#F7BE6D] font-semibold text-[#F05E16] hover:text-red-500 p-2 rounded-md font-play'>Withdraw</button>
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
