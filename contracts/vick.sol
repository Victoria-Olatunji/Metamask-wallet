pragma solidity ^0.8.0;

 

contract so{

    uint data;

 

    function getData() external view returns(uint){
    return data;
    }

 

    function setData(uint _data) external {
    data = _data;
    }

 

    
}