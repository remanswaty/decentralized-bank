require("@nomicfoundation/hardhat-toolbox");

const fs = require('fs');

const INFURA_API_KEY = "96d5d1507ee548328dfe62b76686a03e";
const GOERLI_PRIVATE_KEY = fs.readFileSync(".secret").toString().trim();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};