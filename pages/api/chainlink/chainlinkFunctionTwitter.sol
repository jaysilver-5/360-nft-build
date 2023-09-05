pragma solidity ^0.8.0;

import "https://github.com/smartcontractkit/chainlink/evm-contracts/src/v0.6/ChainlinkClient.sol";

contract ChainlinkTwitter is ChainlinkClient {
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    uint256 public statusCode;
    
    //only the contract owner should be able to tweet
    address payable owner;
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
    	setPublicChainlinkToken();
    	oracle = 0x4CF0507fe3236DedDbE6cD18508f35D9b5e16e7C; // oracle address
    	jobId = "948db03c9576480a8fa0545bee5b28ab"; //job id
    	fee = 11 * 10 ** 17; // 1.1 LINK
    	owner = msg.sender;
    }

    //tweets the supplied string
function tweet(string memory twt) public onlyOwner{
    Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
    //req.add("endpoint", "https://api.twitter.com/1.1/statuses/update.json");
    req.add("status", twt);
    req.add("copyPath", "statusCode");
    sendChainlinkRequestTo(oracle, req, fee);
}
    
//callback function
function fulfill(bytes32 _requestId, uint256 _statusCode) public recordChainlinkFulfillment(_requestId) {
    statusCode = _statusCode;
}
}