const TicketsContract = artifacts.require("TicketsContract.sol");

module.exports = function (deployer) {
  deployer.deploy(TicketsContract);
};
