// SPDX-License-Identifier: unlicensed

pragma solidity ^0.8.0;

contract Bank{
    
    mapping (address => uint)balances;
    address[] addresses;
    address owner;

    constructor(){
        owner = msg.sender;
        // require(msg.value >= 20 wei);
        // balances[owner] = msg.value;
        // addresses.push(owner);
    }
    
    function deposit() external payable returns(bool){
        require(msg.value > 0);
        balances [msg.sender]+= msg.value;
        addresses.push(msg.sender);
        return true;
    }
    
    function withdraw(uint _amount) external returns(bool){
        // uint amount = _amount * 1000000000000000000;
        require(balances[msg.sender] >= _amount);
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        return true;
    }
    function checkBalance()external view returns(uint){
       return balances[msg.sender];
    }
    
    //Only the owner can invoke this function
    function showTotalBankfund()public view returns(uint){
        require(msg.sender == owner);
            return address(this).balance;
    }
    //Only owner can invoke this function
    function totalActiveAccounts()public view returns(uint){
        require(msg.sender == owner);
        return addresses.length;
    }
}